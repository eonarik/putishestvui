import React, { Component } from "react";

import FormControl from "../FormControl";

import DayPicker, { DateUtils } from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import "moment/locale/ru";

class DateRange extends Component {
  static defaultProps = {
    numberOfMonths: 2
  };

  constructor(props) {
    super(props);
    this.state = {
      from: new Date(),
      to: new Date()
    };
  }

  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  };

  render() {
    const props = this.props;
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <FormControl
        id={props.id}
        label={props.label}
        value={
          from && to
            ? `${from.toLocaleDateString()} - ${to.toLocaleDateString()}`
            : ""
        }
      >
        <div className="date-range-container">
          <DayPicker
            numberOfMonths={props.numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
            localeUtils={MomentLocaleUtils}
            locale={"ru"}
          />
        </div>
      </FormControl>
    );
  }
}

export default DateRange;
