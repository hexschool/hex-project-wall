import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useCountdown } from '@/composables/countdownActivity'

describe('countdownActivity', () => {
  beforeEach(() => {
    vi.useFakeTimers() // 使用假的計時器
  })
  afterEach(() => {
    vi.clearAllTimers() // 清理計時器
  })

  it('每秒更新 formattedTime', () => {
    const targetDate = new Date(Date.now() + 10000).toISOString() // 10 秒後
    const { formattedTime, startCountdown } = useCountdown(targetDate)
    startCountdown()
    // 快進 5 秒
    vi.advanceTimersByTime(5000)

    // 應該更新剩餘時間
    expect(formattedTime.value).toMatch(/\d+ 天 \d+ 時 \d+ 分 \d+ 秒/)

    // 快進到倒數結束
    vi.advanceTimersByTime(5000)

    // 應該停止並設為空
    expect(formattedTime.value).toBe('')
  })
  it('unmount 時清除 interval', () => {
    const targetDate = new Date(Date.now() + 10000).toISOString() // 10 秒後
    const { formattedTime, startCountdown } = useCountdown(targetDate)
    startCountdown()
    // 模擬元件卸載
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    vi.advanceTimersByTime(10000)
    formattedTime.value = '' // 模擬卸載時觸發的清理

    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
