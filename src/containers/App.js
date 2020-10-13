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
    focused,
    regexphone,
    regexmail,
    require_mail,
    require_phone
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
        mail: require_mail,
        phone: require_phone,
      },
      valid: isValid,
      touched: touched,
      isfocused: focused,
      mailvalid: regexmail,
      phonevalid: regexphone,
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
        false,
        false,
        false,
        false,
        false
      ),
      lastname: this.stateConfig(
        "input",
        "text",
        "Your lastname",
        "",
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ),
      address: this.stateConfig(
        "input",
        "text",
        "Your adress",
        "",
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ),
      phone: this.stateConfig(
        "input",
        "tel",
        "Phone number",
        "",
        true,
        false,
        false,
        false,
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
        false,
        false,
        true,
        true,
        false
      ),
      checkbox: this.stateConfig(
        "input",
        "checkbox",
        "",
        false,
        true,
        false,
        false,
        false,
        false,
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
    value_copy.mailvalid = this.mailHandler(
      value_copy.value,
      value_copy.validation
    );
    value_copy.phonevalid = this.phoneHandler(
      value_copy.value,
      value_copy.validation
    );
    array_copy[inputIndetifier] = value_copy;
    let isformValid = true;
    for (const i in array_copy) {
      isformValid =
        array_copy[i].valid &&
        isformValid &&
        array_copy["email"].mailvalid &&
        array_copy["phone"].phonevalid;
    }
    this.setState({
      inputs: array_copy,
      formValidation: isformValid,
    });
  };
  submitHandler = (event) => {
    event.preventDefault();
    const data = {
      name: this.state.inputs.name.value,
      lastname: this.state.inputs.lastname.value,
      address: this.state.inputs.address.value,
      phone: this.state.inputs.phone.value,
      email: this.state.inputs.email.value,
      checkbox: this.state.inputs.checkbox.value,
    };

    const array_copy = {
      ...this.state.inputs,
    };

    for (let key in array_copy) array_copy[key].value = "";

    axios
      .post("/", data)
      .then((response) => {
        this.setState({
          inputs: array_copy,
        });
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
    array_copy[inputIndetifier] = value_copy;
    this.setState({
      inputs: array_copy,
    });
  };
  mailHandler = (value, requirements) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (requirements.mail) return regex.test(String(value).toLowerCase());
    else return true;
  };
  phoneHandler = (value, requirements) => {
    const regex = /\+\d{10}$/;
    if (requirements.phone) return regex.test(String(value).toLowerCase());
    else return true;
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
      <form
        className={classes.Form}
        onSubmit={(event) => this.submitHandler(event)}
      >
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
              mailtest={form_element.elements.mailvalid}
              phonetest={form_element.elements.phonevalid}
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
