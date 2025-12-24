module.exports.parseDate = (value) => {
  if (!value) return null;

  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
};
