export const arrayToString = (arr) => {
    if (!Array.isArray(arr)) {
      throw new Error("Input must be an array");
    }
    return arr.join("%20");
  };