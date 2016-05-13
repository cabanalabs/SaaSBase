
module.exports = (state, action) => {
  switch (action.type) {
    // SIGN IN
    case 'LOAD_DASHBOARD':
      return {
        name: action.name,
      };
    default:
      return state;
  }
};
