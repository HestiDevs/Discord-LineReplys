module.exports = {
    name: 'test',
    alias: [],
    run: async (client, message, args) => {
        message.lineReply('Hi!');
    }
}
