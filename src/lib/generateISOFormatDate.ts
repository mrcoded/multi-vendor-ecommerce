function generateISOFormatDate(date: string) {
  // Convert the date string to a Javascript Date object
  const dateObject = new Date(date);

  //Format the date as a string in ISO 8601 format
  const formattedDate = dateObject.toISOString();

  return formattedDate;
}

export default generateISOFormatDate;
