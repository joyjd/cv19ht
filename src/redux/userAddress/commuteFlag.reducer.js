const INITIAL_STATE = {
  commuteFlag: false,
};

const commuteFlagReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_COMMUTE_FLAG": {
      return {
        ...state,
        commuteFlag: action.payload,
      };
    }
    default:
      return state;
  }
};

export default commuteFlagReducer;
