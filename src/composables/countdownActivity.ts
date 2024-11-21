const countdown = {
  isExpired: true,
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0
}

// const timeId = ref(null)

const countdownActivity = (timer: string, callback) => {
  const countdownDate = new Date(timer).getTime()
  //  timeId.value = setInterval((x) => {
  setInterval((x) => {
    const now = new Date().getTime()
    const distance = countdownDate - now

    countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24))
    countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000)
    if (distance < 0) {
      clearInterval(x)
      countdown.isExpired = false
    } else {
      countdown.isExpired = true
    }
    callback(countdown)
  }, 1000)
}
// export default {
//   countdownActivity,
//   timeId,
// }

export default countdownActivity
