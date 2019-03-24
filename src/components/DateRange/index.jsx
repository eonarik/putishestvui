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
      to: new Date(),
      open: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (
      this.state.open &&
      this.refs.dateRangeContainer &&
      !this.refs.dateRangeContainer.contains(event.target)
    ) {
      this.setState({ open: false })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  };

  render() {
    const props = this.props;
    const { from, to, open } = this.state;
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
        onFocus={e => this.setState({ open: true })}
      >
        <div
          ref="dateRangeContainer"
          className={
            "date-range-container date-range-container--right" +
            (open ? " date-range-container--open" : "")
          }
        >
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
