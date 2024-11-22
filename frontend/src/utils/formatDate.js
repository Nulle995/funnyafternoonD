export default function formatDate(date) {
  const newDate = new Date(date);

  const day = parseInt(newDate.getDate() + 1)
    .toString()
    .padStart(2, 0);
  console.log(day);
  console.log(day - 1);
  const month = (parseInt(newDate.getMonth()) + 1).toString().padStart(2, 0);
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
}
