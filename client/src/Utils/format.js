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

export const decodeHtml = (str) => {
  const map = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
  };
  
  let decodedStr = str;
  let hasEscapedChars = true;
  
  while (hasEscapedChars) {
    const originalStr = decodedStr;
    decodedStr = decodedStr?.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) {
      return map[m];
    });
    
 
    hasEscapedChars = originalStr !== decodedStr;
  }
  
  return decodedStr;
};
