module.exports = (client) => {
    client.on('guildMemberAdd', guildMember => {
        let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'New Arrival');
    
        guildMember.roles.add(welcomeRole);
    });
}
