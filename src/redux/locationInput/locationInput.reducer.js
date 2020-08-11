const INITIAL_STATE = {
  locationModalOpen: false,
};

const locationInputReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOCATION_MODAL": {
      return {
        ...state,
        locationModalOpen: action.payload,
      };
    }
    default:
      return state;
  }
};

export default locationInputReducer;
