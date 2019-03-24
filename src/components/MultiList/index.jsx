import React, { Component } from "react";

import FormControl from "../FormControl";
import MultiListItem from "./MultiListItem";

import { clone } from "../../store/fn";

class MultiList extends Component {
  static defaultProps = {
    open: false,
    openChilds: false,
    // массив с данными, формата
    // [
    //   (Object){
    //     (String|Number)value
    //     [, (String)label]
    //     [, (Array)list]
    //   },
    //   ...
    // ]
    list: [],
    searchDepth: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      openChilds: props.openChilds,
      list: props.list,

      checkedValues: {},
      inputFocus: false,
      searchString: ""
    };
  }

  toggleOpen = flag => {
    this.setState({
      open: flag !== undefined ? flag : !this.state.open
    });
  };

  // добавляет или удаляет существующее значение из выбранных значений
  toggleCheckedValue = (key, value = "") => {
    let checkedValues = { ...this.state.checkedValues };
    // в случае, если был передан массив занчений
    if (Array.isArray(key)) {
      const flag = Boolean(value);
      for (let i in key) {
        let item = key[i];
        if (flag) {
          checkedValues[item.value] = item.label;
        } else if (checkedValues[item.value]) {
          delete checkedValues[item.value];
        }
      }
    } else {
      if (checkedValues[key]) {
        delete checkedValues[key];
      } else {
        checkedValues[key] = value;
      }
    }
    this.setState({
      checkedValues
    });
  };

  search = async (e, searchDepth = 0) => {
    const value = e.target.value;
    let filterArr = clone(this.props.list);

    if (value.length) {
      // будем искать рекурсивно по всему списку
      const filterItems = (arr, searchDepth = 0) => {
        if (searchDepth === 0) {
          arr = arr.filter(item => {
            let name = item.label.replace(/^\s*(.+?)\s*$/g, "$1").toLowerCase();
            let val = value.toLowerCase();
            return name.indexOf(val) >= 0;
          });
        } else {
          for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (searchDepth > 0 && item.list) {
              item.list = filterItems([...item.list], searchDepth - 1);
            }
          }
          arr = arr.filter(item => item.list.length);
        }
        return arr;
      };

      await this.setState({
        list: filterItems(filterArr, searchDepth),
        openChilds: true
      });
    } else {
      await this.setState({
        list: this.props.list,
        openChilds: false
      });
    }

    this.setState({
      searchString: value
    });
  };

  clear = () => {
    this.setState({
      checkedValues: {}
    });
  };

  render() {
    const props = this.props;
    const {
      open,
      openChilds,
      list,
      checkedValues,
      inputFocus,
      searchString
    } = this.state;

    const _checkedValues = Object.values(checkedValues);
    // если инпут не в фокусе
    const value = !inputFocus
      // при выбранных значениях
      ? _checkedValues.length
        // покажем значение первого из списка и, если в списке больше 1 значения доп кол-во
        ? _checkedValues[0] + (_checkedValues.length > 1 ? " +" + (_checkedValues.length - 1) : "")
        : ""
      // иначе показываем то что ввели при поиске
      : searchString;

    return (
      <FormControl
        {...props}
        placeholder={
          !inputFocus && searchString.length ? searchString : props.placeholder
        }
        onChange={e => this.search(e, props.searchDepth)}
        onFocus={() => this.setState({ inputFocus: true })}
        onBlur={() => this.setState({ inputFocus: false })}
        value={value}
      >
        {_checkedValues.length ? (
          <div className="btn btn-danger multi-list-clear" onClick={this.clear}>
            &times;
          </div>
        ) : null}
        <ul className={"multi-list" + (open ? " multi-list--active" : "")}>
          {list.map(item => (
            <MultiListItem
              key={item.value}
              open={openChilds}
              checkedValues={checkedValues}
              toggleCheckedValue={this.toggleCheckedValue}
              {...item}
            />
          ))}
        </ul>
      </FormControl>
    );
  }
}

export default MultiList;
