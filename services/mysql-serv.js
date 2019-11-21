var dbUtil = require('../utils/db-util');
var constants = require('../utils/constants.json');

exports.insertHistory = function(input, callback) {
    var params = {
        device_id: input.device_id,
        question: input.question,
        answer: input.answer,
        source: input.source,
        score: input.score
    };
    var sql = 'insert into dialogue_history (device_id, question, answer, source, score, create_time, update_time) value (:device_id, :question, :answer, :source, :score, now(), now());';
    var query = {
        params: params,
        sql: sql
    };
    dbUtil.query(query, function (err, data) {
        if (err) {
            console.error(err);
        }
    });
};

exports.getRelatedQuestion = function(context, callback) {
    return new Promise(function (resolve, reject) {
        var input = context.input;
        var params = {
            question: input.question
        };
        var sql = 'select * from relative_question where relative_question like concat(\'%\', :question, \'%\') limit 5;';
        var query = {
            params: params,
            sql: sql
        };
        dbUtil.query(query, function (err, data) {
            if (err) {
                console.error(err);
            } else {
                var result = new Array();
                if (data) {
                    for(var i = 0; i < data.length; i++) {
                        result.push(data[i]['relative_question']);
                    }
                }
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
};
