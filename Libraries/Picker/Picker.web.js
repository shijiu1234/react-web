/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule ReactPicker
 */
'use strict';

import React, { PropTypes } from 'react';
import autobind from 'autobind-decorator';

const PICKER = 'picker';

class Picker extends React.Component {
  static propTypes = {
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.any, // string or integer basically
  }

  _onChange(event) {
    // shim the native event
    event.nativeEvent.newValue = this.refs[PICKER].value;

    if (this.props.onChange) {
      this.props.onChange(event);
    }

    if (this.props.onValueChange) {
      this.props.onValueChange(event.nativeEvent.newValue);
    }
  }

  render() {
    return (
      <select
        ref={PICKER}
        value={this.props.selectedValue}
        style={{
          margin: 10,
          color: 'inherit',
          font: 'inherit',
          ...this.props.style}}
        onChange={this._onChange}
      >
      {this.props.children}
      </select>
    );
  }
};

class PickerItem extends React.Component {
  static propTypes = {
    value: PropTypes.any, // string or integer basically
    label: PropTypes.string,
  }

  render() {
    return <option value={this.props.value}>{this.props.label}</option>;
  }

};

Picker.item = PickerItem;

autobind(Picker);

Picker.isReactNativeComponent = true;

export default Picker;
