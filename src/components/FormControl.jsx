import React, { Component } from "react";

class FormControl extends Component {
  static defaultProps = {
    label: null,
    id: null,
    className: "form-control",
    type: "text",
    defaultValue: "",
    placeholder: "",

    onFocus: null,
    onBlur: null,
    onChange: null
  };

  render() {
    const props = this.props;

    return (
      <div>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}

        <input
          id={props.id}
          className={props.className}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onChange={props.onChange}
        />

        {props.children}
      </div>
    );
  }
}

export default FormControl;
