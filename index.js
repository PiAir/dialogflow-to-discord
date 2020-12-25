require('dotenv').config();
// Instantiate a DialogFlow client.

const dialogflow = require('dialogflow');

const dialogflowClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = dialogflowClient.sessionPath(process.env.PROJECT_ID, 'discordbot');

const Discord = require('discord.js');

const discordClient = new Discord.Client();

discordClient.on('ready', () => {
  console.log('Ready!');
});

discordClient.on('message', m => {
  if (!shouldBeInvoked(m)) {
    return;
  }

  const message = remove(discordClient.user.username, m.cleanContent);

  if (message === 'help') {
    return m.channel.send(process.env.DISCORD_HELP_MESSAGE);
  }

  const dialogflowRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'nl'
      }
    }
  };

  dialogflowClient.detectIntent(dialogflowRequest).then(responses => {
    
    try {
        // can we display a card of a person?
        var cardFound = false; 
        const messages = responses[0].queryResult.fulfillmentMessages;
        for (var i = 0; i < messages.length; i++) {
            // console.log(messages[i]);
            if (messages[i].message =="card") {
                const card = messages[i].card;
                // console.log(card);
                const exampleEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle(card.title)
                .setURL(card.buttons[0].postback)
                .setDescription(responses[0].queryResult.fulfillmentText)
                .setImage(card.imageUri)
                m.channel.send(exampleEmbed);
                cardFound = true;
            }
        }
        if (!cardFound) {
            m.channel.send(responses[0].queryResult.fulfillmentText);
        }
    } catch(error) {
        m.channel.send(responses[0].queryResult.fulfillmentText);
        console.error(error);
    }
    
  });
});

function shouldBeInvoked(message) {
  return (message.content.startsWith(process.env.DISCORD_PREFIX) ||
          message.content.startsWith('@' + discordClient.user.username) ||
          message.channel.type === 'dm') &&
         discordClient.user.id !== message.author.id;
}

function remove(username, text) {
  return text.replace('@' + username + ' ', '').replace(process.env.DISCORD_PREFIX + ' ', '');
}

discordClient.login(process.env.DISCORD_TOKEN);
