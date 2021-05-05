module.exports = {
    name: 'ping',
    alias: ['p'],
    run: async (client, message, args) => {
        message.lineReplyNoMention(`🏓 Ping: ${client.ws.ping}ms`);
    }
}