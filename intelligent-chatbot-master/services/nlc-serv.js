var NaturalLanguageClassifierV1 = require('watson-developer-cloud/natural-language-classifier/v1');
var vcapServices = require('vcap_services');
var constants = require('../utils/constants.json');

var credentials = vcapServices.getCredentials('natural_language_classifier');
var classifier = new NaturalLanguageClassifierV1({
    username: credentials.username || process.env.NLC_USERNAME,
    password: credentials.password || process.env.NLC_PASSWORD,
    version: "v1"
});

exports.getClassifier = function(pContext) {
    return new Promise(function (resolve, reject) {
        var input = pContext.input;
        var payload = {
            text: pContext.qa || input.question,
            classifier_id: process.env.NLC_CLASSIFIER_ID
        };
        classifier.classify(payload, function(err, data) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                if (data.classes && data.classes.length > 0 && data.classes[0].confidence >= constants.ncl_confidence) {
                    input.answer = data.classes[0].class_name;
                    input.source = '2';
                    input.score = data.classes[0].confidence;
                }
                resolve(pContext);
            }
        });
    });
};
