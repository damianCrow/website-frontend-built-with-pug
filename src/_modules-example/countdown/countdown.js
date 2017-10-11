import moment from 'moment'

export default class Countdown {
  constructor() {
    this.countdownDay = document.getElementsByClassName('countdown__num--day')
    this.countdownHour = document.getElementsByClassName('countdown__num--hour')
    this.countdownMin = document.getElementsByClassName('countdown__num--min')

    this.activateCountdown()
  }

  activateCountdown() {
    const interval = 1000

    setInterval(() => {
      const { countdownDay, countdownHour, countdownMin } = this

      const now = moment()
      const eventTime = moment(1500076800000) // Timestamp - 15th July 2017 12:00:00 AM UTC

      const days = eventTime.diff(now, 'days')
      const hours = eventTime.subtract(days, 'days').diff(now, 'hours')
      const minutes = eventTime.subtract(hours, 'hours').diff(now, 'minutes')

      let i
      for (i = 0; i < countdownDay.length; i += 1) {
        countdownDay[i].innerText = (`0${days}`).slice(-2)
        countdownHour[i].innerText = (`0${hours}`).slice(-2)
        countdownMin[i].innerText = (`0${minutes}`).slice(-2)
      }
    }, interval)
  }
}
