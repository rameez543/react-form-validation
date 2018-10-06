import React, { Component } from "react";
import { FormErrors } from "./FormErrors";
import "./Form.css";

function getAge(DOB) {
  var today = new Date();
  var birthDate = new Date(DOB);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1;
  }
  return age;
}

var divStyle = {
  margin: "10px"
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      user: "",
      age: "",
      formErrors: { email: "", user: "", age: "" },

      emailValid: false,
      userValid: false,
      formValid: false,
      ageValid: false,
      validateField: "",
      fieldValidationErrors: false,
      userValid1: false
    };
  }

  initialState = {
    email: "",
    user: "",
    age: "",

    formErrors: { email: "", user: "", age: "" },
    error: "",
    emailValid: "",
    userValid: "",
    formValid: "",
    ageValid: "",
    userValid1: ""
  };

  handleFormReset = e => {
    this.setState(() => this.initialState);
  };

  test(event) {
    this.setState({
      display: "none",
      hide: false
    });

    alert(" succesfuly submitted");
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let userValid = this.state.userValid;
    let userValid1 = this.state.userValid1;
    let ageValid = this.state.ageValid;
    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "user":
        userValid = value.match(/^[A-Za-z]\w*$/i);
        fieldValidationErrors.username = userValid
          ? ""
          : " must be alpha numeric (no special charecters) and dont start with number";
        userValid1 = value.length > 5 && value.length < 11;
        fieldValidationErrors.Username = userValid1
          ? userValid1
          : " character must be greater than 5 and less than 11";

        break;
      case "age":
        ageValid = getAge(value) >= 18;
        fieldValidationErrors.age = ageValid
          ? ""
          : "  should be greater than or equal to 18";

        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        userValid: userValid,
        userValid1: userValid1,
        ageValid: ageValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.userValid &&
        this.state.userValid1 &&
        this.state.ageValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    return [
      <div>
        <form
          className="demoForm"
          onReset={this.handleFormReset}
          onSubmit={e => this.test(e)}
          style={{ display: this.state.display }}
        >
          <h2 onSubmit={e => this.test(e)}>Sign up</h2>

          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            required
            className="form-control"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}
          />

          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.user
            )}`}
          >
            <label htmlFor="user">Username</label>
            <input
              type="text"
              className="form-control"
              name="user"
              placeholder="Username"
              value={this.state.user}
              onChange={this.handleUserInput}
            />
          </div>
          <div>
            <label htmlFor="user">DOB</label>
            <input
              type="date"
              className="form-control"
              name="age"
              value={this.state.age}
              onChange={this.handleUserInput}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!this.state.formValid}
          >
            Submit
          </button>

          <button
            type="reset"
            value="Reset"
            className="btn btn-primary"
            style={divStyle}
          >
            reset
          </button>
        </form>
      </div>
    ];
  }
}

export default Form;
