const INITIAL_STATE = {
  addressComponents: null,
};

const addressComponentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ADDRESS_COMPONENTS": {
      return {
        ...state,
        addressComponents: action.payload,
      };
    }
    default:
      return state;
  }
};

export default addressComponentsReducer;
