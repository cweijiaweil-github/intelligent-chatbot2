var Conversation = require('watson-developer-cloud/conversation/v1');
var vcapServices = require('vcap_services');
var constants = require('../utils/constants.json');

var credentials = vcapServices.getCredentials('conversation');
var conversation = new Conversation({
    username: credentials.username || process.env.CONVERSATION_USERNAME,
    password: credentials.password || process.env.CONVERSATION_PASSWORD,
    url: credentials.url || constants.conversation_url,
    version_date: Conversation.VERSION_DATE_2017_05_26
});

exports.getConversation = function(pContext) {
    return new Promise(function (resolve, reject) {
        var input = pContext.input;
        var payload = {
            workspace_id: process.env.CONVERSATION_WORKSPACE_ID,
            context: input.context,
            input: {
                text: input.question
            }
        };
        conversation.message(payload, function(err, data) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                var input = pContext.input;
                input.context = data.context;
                if (data.output.next_step === constants.conversation_step.answer) {

                } else if (data.output.next_step === constants.conversation_step.contact) {
                    pContext.qa = data.output.go_qa;
                } else {
                    input.answer = data.output.text.join();
                    input.source = '1';
                }
                resolve(pContext);
            }
        });
    });
};