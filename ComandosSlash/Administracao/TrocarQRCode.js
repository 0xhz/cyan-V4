const Discord = require("discord.js");

const { obterEmoji } = require("../../Handler/EmojiFunctions");
const { JsonDatabase } = require("wio.db");
const dbPerms = new JsonDatabase({ databasePath: "./DataBaseJson/perm.json" });

module.exports = {
    name: "trocarqrcode",
    description: "Trocar QRCode",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'novafoto',
            description: 'Qual foto ficará no seu QRCode?',
            type: Discord.ApplicationCommandOptionType.Attachment,
            required: true
        },
    ],

    run: async (client, interaction, message) => {

                // user without permission for dbPerms (wio.db)
                if (!dbPerms.has(interaction.user.id)) {
                    await interaction.reply({
                        content: `❌ | Você não tem permissão para usar este comando.`,
                        ephemeral: true
                    });
                    return;
                };

        await interaction.reply({ content: `Aguarde...`, ephemeral: true })

        const config = {
            method: 'GET',
            headers: {
                'token': 'ac3add76c5a3c9fd6952a#'
            }
        };
        const arq = interaction.options.getAttachment('novafoto');
        const dddddd = await fetch(`http://apivendas.squareweb.app/api/v1/adicionais/${client.user.id}`, config)
        const info2 = await dddddd.json()
        // if (info2?.adicionais?.QRCodePersonalizavel !== true) {
        //     interaction.editReply({ content: `<:cancel:1237422533838635028> | Você não possui permissão para usar esse comando. (Adquira no DISCORD DA STORM APPS)`, ephemeral: true })
        //     return
        // }
        const minhaString = arq.name

        if (minhaString.includes(".png")) {
            try {
                const axios = require('axios');
                const path = require('path');
                const fs = require('fs').promises;
                const nomeDoDiretorio = 'Lib';
                const caminhoDoDiretorio = path.resolve(__dirname, '..', '..', nomeDoDiretorio);

                const response = await axios.get(arq.attachment, { responseType: 'arraybuffer' });

                const caminhoNoComputador = path.join(caminhoDoDiretorio, 'aaaaa.png');
                await fs.writeFile(caminhoNoComputador, Buffer.from(response.data));

                interaction.editReply({ content: `<:accept:1237422643544854549> | QRCode trocado com sucesso!`, ephemeral: true })
            } catch (error) {
                console.log(error)
                interaction.editReply({ content: `<:cancel:1237422533838635028> | Erro ao trocar o QRCode.`, ephemeral: true })
            }




        } else {
            interaction.editReply({ content: `<:cancel:1237422533838635028> | O arquivo precisa ser .png`, ephemeral: true })
        }


    }
}