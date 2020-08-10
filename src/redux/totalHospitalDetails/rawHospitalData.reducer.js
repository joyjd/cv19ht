const INITIAL_STATE = {
  rawHospitalData: null,
};

const rawHospitalDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_RAW_HOSPITAL_DATA": {
      return {
        ...state,
        rawHospitalData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default rawHospitalDataReducer;
