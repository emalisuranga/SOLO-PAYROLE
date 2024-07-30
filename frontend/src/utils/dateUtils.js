export const getReiwaYear = (year) => {
    const reiwaStartYear = 2019;
    return year >= reiwaStartYear ? `令和${year - reiwaStartYear + 1}年` : `${year}年`;
  };
  
  export const generatePaymentText = (year, month) => {
    const reiwaYear = getReiwaYear(year);
    const monthText = `${month}月`;
    const paymentText = "支給分";
    return `${reiwaYear}${monthText}${paymentText}`;
  };