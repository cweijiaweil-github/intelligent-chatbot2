var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var vcapServices = require('vcap_services');
var constants = require('../utils/constants.json');

var credentials = vcapServices.getCredentials('discovery');
var discovery = new DiscoveryV1({
    username: credentials.username || process.env.DISCOVERY_USERNAME,
    password: credentials.password || process.env.DISCOVERY_PASSWORD,
    version_date: DiscoveryV1.VERSION_DATE_2017_08_01
});

exports.getDiscovery = function(input, callback) {
    return new Promise(function (resolve, reject) {
        var payload = {
            query: input.question,
            environment_id: process.env.DISCOVERY_ENVIRONMENT_ID,
            collection_id: process.env.DISCOVERY_COLLECTION_ID,
            passages: true
        };
        discovery.query(payload, function(err, data) {
            if (err) {
                console.error(err);
            } else {
                var passage = data.passages[0];
                if (data.passages && data.passages.length > 0 && passage.passage_score >= constants.discovery_score) {
                    input.answer = passage.passage_text;
                } else {
                    input.answer = constants.messages.msg_fail;
                }
                resolve(input);
            }
        });
    });
};
