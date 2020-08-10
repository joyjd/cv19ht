const INITIAL_STATE = {
  formattedAddress: null,
};

const formattedAddressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_FORMATTED_ADDRESS": {
      return {
        ...state,
        formattedAddress: action.payload,
      };
    }
    default:
      return state;
  }
};

export default formattedAddressReducer;
