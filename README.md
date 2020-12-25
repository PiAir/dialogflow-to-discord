🎙 dialogflow-to-discord
========================

Easily add Discord bot integration to your Dialogflow project.

## Usage

You'll need to set 5 environment variables:
- `GOOGLE_APPLICATION_CREDENTIALS` should point to the JSON file of your project credentials
- `PROJECT_ID` should be set to your project ID in Google Cloud
- `DISCORD_TOKEN` should be set to your bot's token
- `DISCORD_PREFIX` should be set to the prefix you want your bot to activate with (bot will also work with DMs and @ mentions)
- `DISCORD_HELP_MESSAGE` is what the bot will reply to the `help` command

You can set them by changing the values in the .env file

Then, just run `node index.js`.

## Docker

Set environment variables and mount a directory containing the Google Cloud `keys.json` file to `/usr/data/` as a volume.

## Changes compared to original

- The original integration only catered for fulfillmentText. I've changed the code to see if a "card" if provided in the fulfillmentMessages. If so, then a Discord.RichEmbed() is created and returned.
- Added support for use of .env
- Changed dialogflow language to nl
