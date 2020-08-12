const INITIAL_STATE = {
  cordChangeFlag: null,
};

const cordChangeFlagReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CORD_CHANGE": {
      return {
        ...state,
        cordChangeFlag: action.payload,
      };
    }
    default:
      return state;
  }
};

export default cordChangeFlagReducer;
