const { GatewayIntentBits, Client, Collection, ChannelType, Partials } = require("discord.js")
const { AtivarIntents } = require("./Functions/StartIntents");
const client = new Client({
    intents: Object.keys(GatewayIntentBits),
    partials: Object.keys(Partials)
});

const estatisticasStormInstance = require("./Functions/VariaveisEstatisticas");
const EstatisticasStorm = new estatisticasStormInstance();
module.exports = { EstatisticasStorm }

AtivarIntents();

const config = require("./config.json");
const events = require('./Handler/events')
const slash = require('./Handler/slash');


slash.run(client);
events.run(client);

client.slashCommands = new Collection();


process.on('unhandRejection', (reason, promise) => {
    console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});


client.login(config.token);

