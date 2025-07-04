function generateISOFormatDate(date: string) {
  // Convert the date string to a Javascript Date object
  const dateObject = new Date(date);

  // Format the date as a string in the desired format
  const formattedDate = dateObject.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate;
}

export default generateISOFormatDate;
