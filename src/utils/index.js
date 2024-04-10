const _ = require("lodash");
const NodeGeocoder = require("node-geocoder");
const openGeocoder = require("node-open-geocoder");
// var geocoder = require("geocoder");

// const opencage = require("opencage-api-client");
// OPENCAGE_API_KEY=3b1158a4ed084125afb2f6d49e6fd

var geocoder = NodeGeocoder({
  provider: "opencage",
  apiKey: "3b1158a4ed084125afb2f6d49e6fd",
});

const getInforData = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds);
};

const to_geo_point = async (address) => {
  console.log("geo_point_address::", address);
  let a;
  // console.log("geo_point::", res);
  //   result = res[0].lat + ", " + res[0].lon;
  return a;
};

module.exports = {
  getInforData,
  to_geo_point,
};
