module.exports = client => {   
    let botStatus = [
      'play.dixpvp.ml',
      'dixpvp.tebex.io',
      '@DixPvPNW',
      'Server 24/7'
    ]
    setInterval(function() {
      let status = botStatus[Math.floor(Math.random() * botStatus.length)]
      client.user.setActivity(status, {type: 'WATCHING'})
    }, 2000)  
      console.log(`Logged in as ${client.user.username}`);  
};