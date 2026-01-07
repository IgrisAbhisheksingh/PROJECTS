// trim data
export const trimData = (obj) => {
  let finalObj = {};

  for (let key in obj) {
    finalObj[key] =
      obj[key]?.trim?.().toLowerCase?.() ?? obj[key];
  }

  return finalObj;
};
