const convertDate = (dateObj: Date) => {
  var date = new Date(dateObj);
  var yr = date.getFullYear();
  var mo = date.getMonth() + 1;
  var day = date.getDate();

  return yr + '-' + mo + '-' + day;
};

export {convertDate};
