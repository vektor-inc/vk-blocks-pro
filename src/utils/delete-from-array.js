export const destructiveDeleteFromArray = (array, value) => {
  let index = array.indexOf(value);
  index !== -1 && array.splice(index, 1);
};
