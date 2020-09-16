export const destructiveDeleteFromArray = (array, value) => {
  const index = array.indexOf(value);
  index !== -1 && array.splice(index, 1);
};
