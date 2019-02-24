import React, { Component } from "react";

class MultiListItem extends Component {
  static defaultProps = {
    open: true
  };

  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    };
  }

  toggleCheck = e => {
    const props = this.props;
    e && e.stopPropagation();
    // если у чекбокса нет дочерних элементов
    if (!props.list || !props.list.length) {
      if (props.toggleCheckedValue !== undefined) {
        props.toggleCheckedValue(props.value, props.label);
      }
    }
    // иначе выделяем все внутренние элементы и записываем их checked
    else {
      if (props.toggleCheckedValue !== undefined) {
        const _isChecked = this.isChecked();
        const _isDirty = this.isDirty();
        props.toggleCheckedValue(props.list, !_isChecked && !_isDirty);
        this.toggleOpen(!_isChecked && !_isDirty);
      }
    }
  };

  toggleOpen = flag => {
    this.setState({
      open: flag !== undefined ? flag : !this.state.open
    });
  };

  getCheckedChildsCount = () => {
    const props = this.props;
    let checkedChildsCount = 0;
    if (props.list && props.list.length) {
      for (let i in props.list) {
        let item = props.list[i];
        if (Object.keys(props.checkedValues).indexOf(String(item.value)) >= 0) {
          checkedChildsCount++;
        }
      }
    }
    return checkedChildsCount;
  };

  isChecked = () => {
    const props = this.props;
    const checkedChildsCount = this.getCheckedChildsCount();
    const inCheckedValues =
      Object.keys(props.checkedValues).indexOf(String(props.value)) >= 0;
    const allChildsChecked =
      props.list &&
      props.list.length &&
      checkedChildsCount === props.list.length;
    return inCheckedValues || allChildsChecked;
  };

  isDirty = () => {
    const props = this.props;
    let isDirty = false;
    if (props.list && props.list.length) {
      const checkedChildsCount = this.getCheckedChildsCount();
      isDirty =
        checkedChildsCount > 0 && checkedChildsCount < props.list.length;
    }
    return isDirty;
  };

  render() {
    const props = this.props;
    const { open } = this.state;

    let _isChecked = this.isChecked();
    let _isDirty = this.isDirty();

    return (
      <li
        className={_isChecked ? " active" : ""}
        onClick={() => this.toggleOpen()}
      >
        <span className="multi-list__text">
          {props.list && props.list.length ? (
            <span
              className={
                "multi-list__toggle" +
                (open ? " multi-list__toggle--active" : "")
              }
            />
          ) : null}
          <span
            className={
              "multi-list__checkbox" +
              (_isDirty ? " multi-list__checkbox--checked-dirty" : "") +
              (_isChecked ? " multi-list__checkbox--checked" : "")
            }
            onClick={this.toggleCheck}
          />
          <span className="multi-list__value" onClick={this.toggleCheck}>
            {props.label || props.value}
          </span>
        </span>

        {props.list && props.list.length ? (
          <ul className={open ? "open" : ""}>
            {props.list.map(item => (
              <MultiListItem
                key={item.value}
                checkedValues={props.checkedValues}
                toggleCheckedValue={props.toggleCheckedValue}
                {...item}
              />
            ))}
          </ul>
        ) : null}
      </li>
    );
  }
}

export default MultiListItem;
