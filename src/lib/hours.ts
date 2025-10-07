export function isOpenNow(tz: string = "America/New_York") {
  const local = new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
  const hour = local.getHours() + local.getMinutes() / 60;
  const open = 11;   // 11:00
  const close = 22;  // 10:00 PM
  return hour >= open && hour < close;
}
