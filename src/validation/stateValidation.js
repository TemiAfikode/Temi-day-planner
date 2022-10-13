const validateState = (state) => {
  let errors = [];
  
  for (const key in state) {
    if (Object.hasOwnProperty.call(state, key)) {
      const value = state[key];
      if (!value) {
        errors.push({ path: key, message: `${key} is not provided` });
      }
    } 
  }
  return errors;
};
export default validateState;