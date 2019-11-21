var csv = require('csv');
var constants = require('../utils/constants.json');
var cloudantServ = require('../services/cloudant-serv');

exports.showIndex = function (req, res, next) {
    req.session.user = 'admin';
    res.redirect('./index.html');
};

exports.getSessionID = function (req, res, next) {
    req.session.user = 'admin';
    res.json({sessionID: req.sessionID});
};

exports.getHistory = function (req, res, next) {
    req.session.user = 'admin';
    cloudantServ.searchHistory().then(function (result) {
        res.json(result);
    }, function (err) {
        res.status(500).send(err);
    });
};

exports.outputHistory = function (req, res, next) {
    req.session.user = 'admin';
    cloudantServ.searchHistory().then(function (result) {
        result = result.map((data, i) => {
            var mapHistory = {
                id: i + 1
            };
            var history = data.history;
            var historyKeys = Object.keys(history);
            constants.db_history_keys.forEach(key => {
                if (historyKeys.contains(key)) {
                    mapHistory[key] = history[key];
                } else {
                    mapHistory[key] = '';
                }
            });
            return mapHistory;
        });
        var title = {
            id: 'id'
        };
        constants.db_history_keys.forEach(key => {
            title[key] = key;
        });
        result.splice(0, 0, title);

        var fileName = `dialogue_history_${new Date().format('yyyyMMdd')}.csv`;
        res.setHeader('Content-Disposition', `attachment;filename=${fileName}`);
        res.writeHead(200, {
            'Content-Type': 'text/csv;charset;utf-8'
        });

        csv.generate({seed: 1, columns: 2, length: 20})
            .pipe(csv.parse() )
            .pipe(csv.stringify(result))
            .pipe(res);
    }, function (err) {
        res.status(500).send(err);
    });
};