const INITIAL_STATE = {
  selectedHospitalZoneTags: null,
};

const selectedHospitalZoneTagsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_SELECTED_HOSPITAL_ZONE_TAGS": {
      return {
        ...state,
        selectedHospitalZoneTags: Object.assign([], action.payload),
      };
    }
    default:
      return state;
  }
};

export default selectedHospitalZoneTagsReducer;
