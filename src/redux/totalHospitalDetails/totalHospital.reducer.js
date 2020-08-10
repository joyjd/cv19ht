const INITIAL_STATE = {
  totalHospitalDetails: null,
};

const totalHospitalDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_TOTAL_HOSPITAL_DETAIL": {
      return {
        ...state,
        totalHospitalDetails: action.payload,
      };
    }
    default:
      return state;
  }
};

export default totalHospitalDetailReducer;
