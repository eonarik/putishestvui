import React, { Component } from "react";

class FormControl extends Component {
  static defaultProps = {
    label: null,
    id: null,
    className: "form-control",
    type: "text",
    value: "",
    placeholder: "",

    onFocus: null,
    onBlur: null,
    onChange: null
  };

  constructor(props) {
    super(props);

    this.inputProps = [
      'id', 'className', 'type', 'value', 'defaultValue', 'placeholder', 'disabled', 'readOnly',
      'onClick', 'onKeyDown', 'onMouseOver', 'onMouseOut', 'onFocus', 'onBlur', 'onChange',
    ];
  }

  onChange = e => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {
    const props = this.props;

    let inputProps = {};
    for (let key in props) {
      if (this.inputProps.indexOf(key) >= 0) {
        inputProps[key] = props[key];
      }
    }

    return (
      <div>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}

        <input
          {...inputProps}
          value={props.value}
          onChange={this.onChange}
        />

        {props.children}
      </div>
    );
  }
}

export default FormControl;
