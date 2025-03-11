interface TimeUnits {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

export function TimestampConverter(timestamp: string | Date): string {
  const date = new Date(timestamp)

  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }

  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const units: TimeUnits = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  }

  if (seconds < 5) return 'just now'
  if (seconds < 60) return `${seconds} seconds ago`
  if (seconds < 90) return 'about a minute ago'

  for (const [unit, secondsInUnit] of Object.entries(units)) {
    const value = Math.floor(seconds / secondsInUnit)
    if (value >= 1) {
      return `${value} ${unit}${value === 1 ? '' : 's'} ago`
    }
  }

  return 'just now'
}
