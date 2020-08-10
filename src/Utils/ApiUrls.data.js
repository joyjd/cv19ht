const ApiUrls = {
  getUserCurrentLocation: "https://maps.googleapis.com/maps/api/geocode/json?latlng=",
  getPlaceDetails: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=",
  getHospitalCompleteDetails: "https://maps.googleapis.com/maps/api/place/details/json?place_id=",
  getCoronaUpdate: "https://api.covid19india.org/state_district_wise.json",
  getHospitalCodes: "https://joyjd.github.io/cv19api/hospitalCodes.json",
  getHospitalDetails: "https://joyjd.github.io/cv19api/hospitalDetails.json",
};

export default ApiUrls;
