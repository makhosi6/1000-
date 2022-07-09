
let unixtime = 90


const now = new Date().getTime() // - (2*60*60*1000);
  console.log('Unixtime ' + unixtime)
  console.log('now ' + now)
  const duration = Math.abs(unixtime - now)
  //const lastupdated = this.msToTime(elapes)
  let lastupdated = ''
  let seconds = Math.floor((duration / 1000) % 60)
  let minutes = Math.floor((duration / (1000 * 60)) % 60)
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24)



  console.log({
      seconds,minutes,hours, duration, unixtime
  })