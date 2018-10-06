import React from "react";
import "./Form.js";
export const FormErrors = ({ formErrors }) => (
  <div className="formErrors" style={{ color: "red" }}>
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i}>
            {fieldName} {formErrors[fieldName]}
          </p>
        );
      } else {
        return "";
      }
    })}
  </div>
);
