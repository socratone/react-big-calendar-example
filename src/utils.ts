export function getWeekOfMonth(date: Date) {
  // Get the day of the month (1-31)
  const dayOfMonth = date.getDate();

  // Get the day of the week (0-6, where 0 is Sunday)
  const dayOfWeek = date.getDay();

  // Calculate the offset to find the first day of the week
  const firstDayOffset = (dayOfWeek + 6) % 7;

  // Calculate the week of the month
  const weekOfMonth = Math.ceil((dayOfMonth + firstDayOffset) / 7);

  return weekOfMonth;
}
