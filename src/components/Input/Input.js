import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let InputType = null;
  let error_message = null;
  const classes_array = [classes.InputType];
  if (props.invalid && props.touched && !props.isfocused) {
    error_message = "Required";
    classes_array.push(classes.Invalid);
  }
  if (props.elementprops.type === "checkbox")
    classes_array.push(classes.Checkbox);
  switch (props.elementprops.type) {
    case "checkbox":
      InputType = (
        <input
          type={props.elementprops.type}
          className={classes_array.join(" ")}
          {...props.elementprops}
          checked={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      InputType = (
        <input
          type={props.elementprops.type}
          className={classes_array.join(" ")}
          {...props.elementprops}
          value={props.value}
          onChange={props.changed}
          onBlur={props.defocus}
          onFocus={props.focus}
          focused={props.focused}
          pattern={props.pattern}
        />
      );
  }

  return (
    <div className={classes.InputDiv}>
      {props.elementprops.type === "checkbox" ? (
        <label className={classes.Label}> Captcha </label>
      ) : null}
      {InputType}
      <span className={classes.Error}>{error_message}</span>
    </div>
  );
};

export default input;
