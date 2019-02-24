import Store from "./store";

// <--->
// result request to https://api2.mouzenidis.com/search/filter/destinations
const destinationsResult = require("./testdata/search-filter-destinations");
// result request to https://api2.mouzenidis.com/search/filter/departurecities
const departurecitiesResult = require("./testdata/search-filter-departurecities");
// </--->

export const destinations = destinationsResult.data.countries;
export const departurecities = departurecitiesResult.data.departureCities;

export default function init() {
  let countries = {};
  let cities = {};
  let towns = {};
  let hotels = {};

  for (let country of destinations) {
    countries[country.id] = {
      id: country.id,
      name: country.name
    };
    for (let city of country.cities) {
      cities[city.id] = {
        id: city.id,
        name: city.name,
        countryId: country.id,
        group: city.group
      };
      for (let town of city.towns) {
        towns[town.id] = {
          id: town.id,
          name: town.name,
          cityId: city.id,
          countryId: country.id
        };
        for (let hotel of town.hotels) {
          hotels[hotel.id] = {
            ...hotel,
            townId: town.id,
            cityId: city.id,
            countryId: country.id
          };
        }
      }
    }
  }

  Store.set({
    countries,
    cities,
    towns,
    hotels
  });
}
