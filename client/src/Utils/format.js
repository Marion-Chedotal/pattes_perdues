export const formatDate = (dateToFormat) => {
  const date = new Date(dateToFormat);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const capitalizeFirstLetter = (string) => {
  console.log(string);
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

// const format = { formatDate, capitalizeFirstLetter};
// export default format;
