export default function formatAddedDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  // Remove time from both dates for comparison
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    return "Added today";
  }
  
  return `Added on: ${date.toLocaleDateString()}`;
}
