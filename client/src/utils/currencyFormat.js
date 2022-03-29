const currencyFormat = (num) => {
  if (num === null || num === "-")
    return "-";
  return '$' + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const currencyFormatWithDigit = (num, digit) => {
  if (num === null || num === "-")
    return "-";
  return '$' + parseFloat(num).toFixed(digit).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
export default currencyFormat;
