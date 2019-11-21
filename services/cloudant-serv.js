var vcapServices = require('vcap_services');
var Cloudant = require('@cloudant/cloudant');
var constants = require('../utils/constants.json');

var credentials = vcapServices.getCredentials('cloudantNoSQLDB');
if (!credentials.url) {
    credentials = {
        username: process.env.CLOUDANT_DB_USERNAME,
        password: process.env.CLOUDANT_DB_PASSWORD,
        url: process.env.CLOUDANT_DB_URL
    };
}
var cloudant = Cloudant(credentials);
var questionDBName = 'relative_question';
var historyDBName = 'dialogue_history';
var questionIndex = 'searchQuestions';
var questionDB = cloudant.db.use(questionDBName);
var historyDB = cloudant.db.use(historyDBName);
cloudant.db.create(questionDBName, function (err, data) {
    if (!err) {
        console.log('Created Question DB: ' + questionDBName);
        var initData = require('../data/initQuestion.json');
        questionDB.bulk({docs: initData}, function (err, data) {
            if (!err) {
                console.log('Inserted Question Data: ' + data.length);
            }
        });
        var index = require('../data/questionIndex.json');
        questionDB.insert(index, `_design/${questionIndex}`, function (err, data) {
            if (!err) {
                console.log('Created Question Index: ' + data.id);
            }
        });
    }
});
cloudant.db.create(historyDBName, function (err, data) {
    if (!err) {
        console.log('Created History DB: ' + historyDBName);
        var index = require('../data/historyIndex.json');
        historyDB.createIndex(index, function (err, data) {
            if (!err) {
                console.log('Created History Index: ' + data.id);
            }
        });
    }
});

exports.insertHistory = function(pContext) {
    return new Promise(function (resolve, reject) {
        var input = pContext.input;
        var date = new Date().getLocalTime(9).format('yyyy-MM-dd hh:mm:ss');
        var document = {
            history: {
                device_id: input.device_id,
                question: input.question,
                answer: input.answer,
                source: input.source,
                score: input.score,
                create_time: date,
                update_time: date
            }
        };
        historyDB.insert(document, function (err, body, header) {
            if (err) {
                reject(err);
            } else {
                resolve(pContext);
            }
        });
    });
};

exports.searchHistory = function () {
    return new Promise(function (resolve, reject) {
        var params = {
            selector: {
            },
            sort: [
                {
                    'history.create_time': 'desc'
                }
            ]
        };
        historyDB.find(params, function (err, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body.docs);
            }
        });
    });
};

exports.getRelatedQuestion = function(context) {
    return new Promise(function (resolve, reject) {
        var input = context.input;
        var qs = {
            q: `question:"${context.input.question}*"`,
            limit: '5'
        };
        questionDB.search(questionIndex, questionIndex, qs, function (err, body) {
            if (err) {
                reject(err);
            } else {
                var result = new Array();
                body.rows.forEach((item, i) => {
                    result.push(item.fields.question);
                });
                if (result.length > 0) {
                    result.unshift(constants.messages.msg_db_with);
                    input.answer = result.join('\n');
                    input.source = '3';
                } else {
                    input.answer = constants.messages.msg_fail;
                    input.source = '0';
                }
                resolve(context);
            }
        });
    });
}