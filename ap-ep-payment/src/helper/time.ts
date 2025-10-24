export function getTimeDiffInFormatHHMM(start: Date, end: Date): string {
  const diffMs = end.getTime() - start.getTime();
  const diffMinutes = diffMs / (1000 * 60);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

export function getTimeDiffInHour(start: Date, end: Date): number {
  const diffMs = end.getTime() - start.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  return Math.floor(diffHours);
}

export function parseTimeStringToDate(timeStr: string): Date {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return new Date(1970, 0, 1, hours, minutes, seconds); // dummy date
}

export function normalizeToTimeOnly(date: Date): Date {
  return new Date(
    1970,
    0,
    1,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
}
