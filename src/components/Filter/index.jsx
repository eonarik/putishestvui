import React, { Component } from "react";

import MultiList from "../MultiList";
import DateRange from "../DateRange";

import Store from "../../store";
import { uid } from "../../store/fn";
import { departurecities } from "../../init";

const GLOBAL_COUNTRY_ID = 460;

class Filter extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    // const props = this.props;

    const countries = Store.get("countries");
    let _countries = [];
    for (let i in countries) {
      let _country = {
        value: countries[i].id,
        label: countries[i].name
      };
      const cities = Store.get("cities", {
        countryId: _country.value
      }).sort((a, b) => {
        if (a.group < b.group) return -1;
        else return 1;
      });
      let _cities = [];
      for (let i in cities) {
        let _city = {
          value: cities[i].id,
          label: cities[i].name
        };
        _cities.push(_city);
      }
      _country.list = _cities;
      _countries.push(_country);
    }

    const cities = departurecities.filter(
      item => item.countryId === GLOBAL_COUNTRY_ID
    );
    let _cities = [];
    for (let i in cities) {
      let _city = {
        value: cities[i].id,
        label: cities[i].name
      };
      _cities.push(_city);
    }

    return (
      <div className="row">
        <div className="col-12 col-md-4">
          <MultiList
            id={uid()}
            label="Откуда"
            placeholder="Поиск..."
            list={_cities}
            searchDepth={0}
            open={true}
          />
        </div>
        <div className="col-12 col-md-4">
          <MultiList
            id={uid()}
            label="Куда"
            placeholder="Поиск..."
            list={_countries}
            searchDepth={1}
            open={true}
          />
        </div>
        <div className="col-12 col-md-4">
          <DateRange
            id={uid()}
            label="Вылет"
            placeholder="Дата: с _ по _"
          />
        </div>
      </div>
    );
  }
}

export default Filter;
