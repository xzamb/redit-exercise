import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import './Form.css';
import { colors } from "material-ui/styles";

export default class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      header: [...props.header],
      data: [],
      errors: [],
    }
  }

  componentDidMount(){
    this.setState({...this.state, data: this.generateFields, errors: this.generateFields})
  }

  generateFields = () => {
    return this.state.header.map(value => value.prop).reduce((errors, headerValue) => ({
      ...errors,
      [headerValue]: ""
    }), {});
  }

  change = e => {
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value}
    });
  };

  validate = () => {
    let hasError = false;

    const errors = this.generateFields();

    const {data} = this.state;

    Object.keys(data).map(key => {
      if(data[key] === "" || data[key] === undefined || data[key] === null){
        errors[key] = "Required field";
        hasError = true;
      }
    });

    this.setState({
      ...this.state,
      errors: {...errors}
    });

    return hasError;
  };

  onSubmit = e => {
    e.preventDefault();
    const hasError = this.validate();
    if (!hasError) {
      this.props.onSubmit(this.state.data);
    }
  };

  render() {
    return (
      <form>
        {this.state.header.map((item, index) => {
          return <div key={index}>
              <TextField
                name = {item.prop}
                placeholder= {item.name}
                floatingLabelText={item.name}
                onChange={e => this.change(e)}
                errorText={this.state.errors[item.prop]}
                floatingLabelFixed
              />
              <br />
          </div>
        })}
        <br />
        <div className="form__buttons">
          <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} backgroundColor={colors.amber400} />
          <RaisedButton label="Cancel" onClick={this.props.handleClose} backgroundColor={colors.grey400} />
        </div>
      </form>
    );
  }
}
