export function formatDate(date?: string) {
  if (!date) return "No date available";
  const dateToFormat = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(dateToFormat);
  return formattedDate;
}
