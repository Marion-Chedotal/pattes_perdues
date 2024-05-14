export const formatDate = (dateToFormat) => {
  // to deal with a new message in conversation
  if (!dateToFormat) {
    return "";
  }

  const date = new Date(dateToFormat);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const capitalizeFirstLetter = (string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};