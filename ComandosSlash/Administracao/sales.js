const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { JsonDatabase } = require("wio.db");
const dbPerms = new JsonDatabase({ databasePath: "./DataBaseJson/perm.json" });


module.exports = {
  name: "vendas",
  description: "Use para ver suas vendas",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction, message) => {
  
    await interaction.reply({ content: `<a:1236149701401907210:1237422699740135535> Aguarde...`, ephemeral: true })

        // user without permission for dbPerms (wio.db)
        if (!dbPerms.has(interaction.user.id)) {
          await interaction.reply({
              content: `❌ | Você não tem permissão para usar este comando.`,
              ephemeral: true
          });
          return;
      };

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("todayyyy")
          .setLabel('Hoje')
          .setStyle(2)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("7daysss")
          .setLabel('Últimos 7 dias')
          .setStyle(2)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("30dayss")
          .setLabel('Últimos 30 dias')
          .setStyle(2)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("totalrendimento")
          .setLabel('Rendimento Total')
          .setStyle(3)
          .setDisabled(false),
      )

    interaction.editReply({ content: `Olá senhor **${interaction.user.username}**, selecione algum filtro.`, components: [row], ephemeral: true })
  }
}
