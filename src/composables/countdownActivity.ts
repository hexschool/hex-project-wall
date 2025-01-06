import { ref } from 'vue'

// 定義倒數邏輯
export function useCountdown(date: string) {
  const formattedTime = ref('') // 儲存格式化後的時間字符串
  const interval = ref()

  const targetDate = new Date(date)

  // 計算剩餘時間
  const calculateRemainingTime = () => {
    const now = new Date()
    const timeDiff = Math.floor((targetDate.getTime() - now.getTime()) / 1000)
    return Math.max(timeDiff, 0)
  }

  // 格式化時間
  const formatTime = (time: number) => {
    const days = Math.floor(time / (24 * 60 * 60))
    const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60))
    const minutes = Math.floor((time % (60 * 60)) / 60)
    const seconds = time % 60

    return time > 0 ? `${days} 天 ${hours} 時 ${minutes} 分 ${seconds} 秒` : ''
  }

  //  倒數邏輯
  const startCountdown = () => {
    formattedTime.value = formatTime(calculateRemainingTime())
    if (interval.value) clearInterval(interval.value)

    interval.value = setInterval(() => {
      const newTime = calculateRemainingTime()
      formattedTime.value = formatTime(newTime)

      // 如果時間倒數到 0，停止計時器並讓畫面隱藏
      if (newTime <= 0 && interval) {
        clearInterval(interval.value)
        interval.value = null
      }
    }, 1000)
  }

  return {
    formattedTime,
    startCountdown,
    interval
  }
}
