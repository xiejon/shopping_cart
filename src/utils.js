export const getError = (error) => {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  };

export const roundNum = (num) =>
Math.round(num * 100 + Number.EPSILON) / 100;