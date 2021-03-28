const { Plugin } = require('powercord/entities')
const { inject, uninject } = require('powercord/injector')
const { React, getModule, getModuleByDisplayName} = require('powercord/webpack')
const { get } = require('powercord/http');

module.exports = class Inspiro extends Plugin {
    async startPlugin () {
        powercord.api.commands.registerCommand({
            command: 'Inspirobot',
            alias: 'inspiro',
            description: 'Sends \'inspirational\' quotes from InspiroBot',
            usage: '{c}',
            executor: this.inspiro.bind(this)
        })
    }  
    pluginWillUnload () {
        powercord.api.commands.unregisterCommand('Inspirobot')
    }
    async inspiro() {
        const inspiro = await get(`https://inspirobot.me/api?generate=true`).then(r => r.body);
        let inspiration = ''
        for(let i=0;i<48;i++) inspiration+=String.fromCharCode(inspiro[i])
        return {
            send: true,
            result: inspiration
        }
    }
}
