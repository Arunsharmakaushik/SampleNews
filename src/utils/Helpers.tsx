export const getTimeDifference = (inputDateString: string) => {
  const currentDate = new Date();
  const givenDate = new Date(inputDateString);

  const diffInTime = currentDate.getTime() - givenDate.getTime();
  const diffInHours = diffInTime / (1000 * 3600);

  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    // Format date as DD-MM-YYYY
    const date = givenDate.getUTCDate().toString().padStart(2, '0');
    const month = (givenDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const year = givenDate.getUTCFullYear();
    return `${date}-${month}-${year}`;
  }
};
