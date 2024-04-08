const _ = require("lodash");
const NodeGeocoder = require("node-geocoder");
const openGeocoder = require("node-open-geocoder");

const options = {
  provider: "opencage",
  apiKey: "YOUR-API-KEY",
};

const geocoder = NodeGeocoder(options);

const getInforData = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds);
};

const to_geo_point = async (address) => {
  console.log("geo_point_address::", address);

  const result = await geocoder.geocode("29 champs elysée paris");

  console.log("geo_point::", result);
  //   result = res[0].lat + ", " + res[0].lon;
  return result;
};

module.exports = {
  getInforData,
  to_geo_point,
};
