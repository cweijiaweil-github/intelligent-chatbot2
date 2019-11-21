var mysql = require('mysql');
var vcapServices = require('vcap_services');

var mySQLPool = null;

var initMySQL = function () {
    var credentials = vcapServices.getCredentials('cleardb');
    var config = {
        host: credentials.hostname || process.env.CLEAR_DB_HOSTNAME,
        port: credentials.port || process.env.CLEAR_DB_PORT,
        database: credentials.name || process.env.CLEAR_DB_NAME,
        user: credentials.username || process.env.CLEAR_DB_USERNAME,
        password: credentials.password || process.env.CLEAR_DB_PASSWORD
    };
    mySQLPool = mysql.createPool(config);
}

exports.query = function(query, callback){
    var sql = query.sql;
    if (!sql) {
        return callback('There is no query~');
    }
    if (!mySQLPool) {
        initMySQL();
    }
    mySQLPool.getConnection(function (err, connection) {
        if (err) {
            return callback(err);
        } else {
            connection.ping(function (err) {
                if (err) {
                    connection.destroy();
                    return callback(err);
                } else {
                    connection.config.queryFormat = function (query, params) {
                        if (!params) {
                            return query;
                        }

                        return query.replace(/\:(\w+)/g, function (text, key) {
                            if (params.hasOwnProperty(key)) {
                                return this.escape(params[key]);
                            }
                            return text;
                        }.bind(this));
                    };

                    var params = query.params;
                    connection.query(sql, params, function (err, results) {
                        connection.release();
                        callback(err, results);
                    });
                }
            });
        }
    });
}