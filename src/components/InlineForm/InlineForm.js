import React from "react";
import TextField from "material-ui/TextField";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import CancelIcon from "material-ui/svg-icons/navigation/cancel";
import {TableRowColumn } from "material-ui/Table";

export default class InlineForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        ...props.rowData
      },
      errors: this.generateErrorFields()
    };
  }

  generateErrorFields = () => {
    return this.props.header.map(value => value.prop).reduce((errors, headerValue) => ({
      ...errors,
      [headerValue]: ""
    }), {});
  }

  change = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value
      }
    }));
  };

  validate = () => {
    let hasError = false;

    const errors = this.generateErrorFields();

    const {values} = this.state;

    Object.keys(values).map(key => {
      if(values[key] === "" || values[key] === undefined || values[key] === null){
        errors[key] = "Required field";
        hasError = true;
      }
    });

    this.setState({
      errors
    });

    return hasError;
  };

  onSubmit = e => {
    e.preventDefault();
    const hasErrors = this.validate();
    if (!hasErrors) {
      this.props.handleSave(this.props.index, this.state.values);
    }
  };

  render() {
    const { header} = this.props;
    return [
      header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`}>
          <TextField
            name={y.prop}
            onChange={this.change}
            value={this.state.values[y.prop]}
            errorText={this.state.errors[y.prop]}
          />
        </TableRowColumn>
      )),
      <TableRowColumn key="icon-row-column">
        <CheckIcon onClick={this.onSubmit} />
        <CancelIcon onClick={this.props.stopEditing} />
      </TableRowColumn>
    ];
  }
}
