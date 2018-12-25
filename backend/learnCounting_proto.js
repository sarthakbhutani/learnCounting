/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'StartCountIntent');
  },
  handle(handlerInput) {
    // const factArr = data;
    // const factIndex = Math.floor(Math.random() * factArr.length);
    // const randomFact = factArr[factIndex];
    var countnumber = handlerInput.requestEnvelope.request.intent.slots.count.value;
    
    //set Difficulty level
    var difficultyLevel = handlerInput.requestEnvelope.request.intent.slots.difficultyLevel.value;
    
    var count = ' ' + ' ' + ' ';  //change here
  var speakOutput = "So, I am gonna begin the count "; //+ count + "<break time = \"4s\"/>" + "hey"
    for(var i = 1; i <= countnumber;i++){
    // for(var i = 1; i <= 12;i++){
          // count = count + String(i) + 'n' ;
          if (difficultyLevel == 'high' )
      speakOutput = speakOutput + String(i) + " <break time = \"1s\"/>" ;
      
      else if (difficultyLevel == 'mid' )
      speakOutput = speakOutput + String(i) + " <break time = \"2s\"/>" ;
      
      else if (difficultyLevel == 'low' )
      speakOutput = speakOutput + String(i) + " <break time = \"4s\"/>" ;
      
      else
      speakOutput = speakOutput + String(i) + " <break time = \"1s\"/>" ;
          }
//    const speechOutput = "So, I am gonna begin the count "+ count + "<break time = \"4s\"/>" + "hey" ;
      const speechOutput = speakOutput;
      
      //creating home card
      // var SimpleCard;
      // SimpleCard.setTitle('Learn Counting me boii');
      // SimpleCard.setContent('Learn Counting me boii content'); 
      
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard("Hi! So, I will count till " + countnumber + ". Please follow along")
      // .SpeechletResponse.newTellResponse()
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder
      .speak('bye!')
      .withShouldEndSession(true)
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('If you would like to ask alexa to count please use phrases like Alexa open learn count and count till 100 at high speed')
      .withShouldEndSession(true)
      // .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Learn Counting';
// const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';


const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
