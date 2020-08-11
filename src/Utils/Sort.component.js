export const customSort = (hospitalList) => {
  let temp = hospitalList.sort((a, b) => Number(a["h_dist"]) - Number(b["h_dist"]));
  let lastIndex = null;
  let remArr = [];
  temp.forEach((hospital, index) => {
    if (hospital["h_dist"] == "") {
      lastIndex = index;
    }
  });

  if (lastIndex != null) {
    remArr = temp.splice(0, lastIndex + 1);
  }
  //console.log(remArr);
  temp = temp.concat(remArr);

  return temp;
};
