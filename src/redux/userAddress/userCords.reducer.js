const INITIAL_STATE = {
  userCords: null,
};

const userCordsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_CORDS": {
      return {
        ...state,
        userCords: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userCordsReducer;
