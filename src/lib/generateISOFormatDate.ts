function generateISOFormatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format. Please use a valid date string.");
  }

  return date.toISOString(); // Returns in ISO 8601 format with 'Z'
}

export default generateISOFormatDate;
