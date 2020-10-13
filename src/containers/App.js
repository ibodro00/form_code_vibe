import React, { Component } from "react";
import classes from "./App.module.css";
import Input from "../components/Input/Input";
import axios from "axios";

class App extends Component {
  stateConfig = (
    elementType,
    type,
    placeholder,
    value,
    require_value,
    isValid,
    touched,
    focused
  ) => {
    let object = null;
    object = {
      elementType: elementType,
      elementProps: {
        type: type,
        placeholder: placeholder,
      },
      value: value,
      validation: {
        required: require_value,
      },
      valid: isValid,
      touched: touched,
      isfocused: focused,
    };
    return object;
  };
  state = {
    inputs: {
      name: this.stateConfig(
        "input",
        "text",
        "Your name",
        "",
        true,
        false,
        false,
        true
      ),
      lastname: this.stateConfig(
        "input",
        "text",
        "Your lastname",
        "",
        true,
        false,
        false,
        true
      ),
      address: this.stateConfig(
        "input",
        "text",
        "Your adress",
        "",
        true,
        false,
        false,
        true
      ),
      phone: this.stateConfig(
        "input",
        "tel",
        "Phone number",
        "",
        true,
        false,
        false,
        true
      ),
      email: this.stateConfig(
        "input",
        "text",
        "Your email",
        "",
        true,
        false,
        false,
        true
      ),
      checkbox: this.stateConfig(
        "input",
        "checkbox",
        "",
        false,
        true,
        false,
        false,
        false
      ),
    },
    formValidation: false,
  };
  changeHandler = (event, inputIndetifier) => {
    const array_copy = {
      ...this.state.inputs,
    };
    const value_copy = {
      ...array_copy[inputIndetifier],
    };
    if (inputIndetifier !== "checkbox") {
      value_copy.value = event.target.value;
    } else {
      value_copy.value = !this.state.inputs.checkbox.value;
    }
    if (inputIndetifier !== "checkbox") {
      value_copy.valid = this.Validationcheck(
        value_copy.value,
        value_copy.validation,
        true
      );
    } else {
      value_copy.valid = this.Validationcheck(
        value_copy.value,
        value_copy.validation,
        false
      );
      value_copy.isfocused = !this.state.inputs.checkbox.isfocused;
    }
    value_copy.touched = true;
    array_copy[inputIndetifier] = value_copy;
    let isformValid = true;
    for (const i in array_copy) {
      isformValid = array_copy[i].valid && isformValid;
    }

    this.setState({
      inputs: array_copy,
      formValidation: isformValid,
    });
  };
  submitHandler = () => {
    const data = {
      name: this.state.inputs.name.value,
      lastname: this.state.inputs.lastname.value,
      address: this.state.inputs.address.value,
      phone: this.state.inputs.phone.value,
      email: this.state.inputs.email.value,
      checkbox: this.state.inputs.checkbox.value,
    };
    axios
      .post("/", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  Validationcheck = (value, requirements, check) => {
    let check_required = false;
    if (check) {
      const value_trimmed = value.trim();
      if (requirements.required) check_required = value_trimmed !== "";
    } else {
      check_required = value;
    }
    return check_required;
  };
  focusHandler = (event, inputIndetifier) => {
    const array_copy = {
      ...this.state.inputs,
    };
    const value_copy = {
      ...array_copy[inputIndetifier],
    };
    if (event.type === "blur") value_copy.isfocused = false;
    else if (event.type === "focus") value_copy.isfocused = true;
    // console.log(value_copy);
    array_copy[inputIndetifier] = value_copy;
    this.setState({
      inputs: array_copy,
    });
  };
  render() {
    const array = [];
    let form_elements = null;
    for (let key in this.state.inputs) {
      array.push({
        id: key,
        elements: this.state.inputs[key],
      });
    }
    form_elements = (
      <form className={classes.Form} onSubmit={this.submitHandler}>
        <h4>Please, enter your data</h4>
        {array.map((form_element) => {
          return (
            <Input
              key={form_element.id}
              elementtype={form_element.elements.elementType}
              elementprops={form_element.elements.elementProps}
              value={form_element.elements.value}
              changed={(event) => this.changeHandler(event, form_element.id)}
              invalid={!form_element.elements.valid}
              touched={form_element.elements.touched}
              defocus={(event) => this.focusHandler(event, form_element.id)}
              focus={(event) => this.focusHandler(event, form_element.id)}
              isfocused={form_element.elements.isfocused}
              pattern={form_element.elements.pattern}
            />
          );
        })}
        <button
          className={classes.Button}
          disabled={!this.state.formValidation}
        >
          Submit
        </button>
      </form>
    );
    return (
      <div className={classes.App}>
        <h1 className={classes.H1}>Submission Form</h1>
        {form_elements}
      </div>
    );
  }
}

export default App;
