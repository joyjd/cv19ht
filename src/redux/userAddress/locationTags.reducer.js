const INITIAL_STATE = {
  locationTags: null,
};

const locationTagsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOCATION_TAGS": {
      return {
        ...state,
        locationTags: Object.assign([], action.payload),
      };
    }
    default:
      return state;
  }
};

export default locationTagsReducer;
