const formatDate = (dateToFormat) => {
  const date = new Date(dateToFormat);

  // Extraire le jour, le mois et l'année
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Janvier est 0
  const year = date.getFullYear().toString();

  // Formater la date dans le format "dd/mm/yyyy"
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
export default formatDate;