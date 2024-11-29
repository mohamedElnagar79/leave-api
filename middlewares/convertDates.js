const { toHijri } = require("hijri-converter");

module.exports = (gregorianDate) => {
  const [year, month, day] = gregorianDate.split("-").map(Number);
  const hijriDate = toHijri(year, month, day);
  return `${hijriDate.hd}-${hijriDate.hm}-${hijriDate.hy}`;
  //   details: hijriDate,
};
