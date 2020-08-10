import { combineReducers } from "redux";

import selectedHospitalReducer from "./selectedHospital/selectedHospital.reducer";
import totalHospitalDetailReducer from "./totalHospitalDetails/totalHospital.reducer";
import addressComponentsReducer from "./userAddress/addressComponents.reducer";
import formattedAddressReducer from "./userAddress/formattedAddress.reducer";
import locationTagsReducer from "./userAddress/locationTags.reducer";
import userCordsReducer from "./userAddress/userCords.reducer";
import selectedHospitalZoneTagsReducer from "./selectedHospital/selectedHospitalZoneTags.reducer";
import rawHospitalDataReducer from "./totalHospitalDetails/rawHospitalData.reducer";
import searchReducer from "./search/search.reducer";

export default combineReducers({
  selectedHospitalList: selectedHospitalReducer,
  totalHospitalDetails: totalHospitalDetailReducer,
  addressComponents: addressComponentsReducer,
  formattedAddress: formattedAddressReducer,
  locationTags: locationTagsReducer,
  userCords: userCordsReducer,
  selectedHospitalZoneTags: selectedHospitalZoneTagsReducer,
  rawHospitalData: rawHospitalDataReducer,
  searchText: searchReducer,
});
