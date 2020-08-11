const INITIAL_STATE = {
  selectedHospital: null,
};

const selectedHospitalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_SELECTED_HOSPITAL_LIST": {
      return {
        ...state,
        selectedHospital: Object.assign([], action.payload),
      };
    }
    default:
      return state;
  }
};

export default selectedHospitalReducer;
