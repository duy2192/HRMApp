import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import { makeStyles } from "@mui/styles";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};
const useStyles = makeStyles({
  input: {
    background: "#fff",
    zIndex: "0",
  },
});
function InputField(props) {
  const { form, name, label, disabled, type = "string", size } = props;
  const classes = useStyles();
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value = "", name },
        fieldState: { invalid, error },
      }) => (
        <>
          <TextField
            fullWidth
            margin="normal"
            label={label}
            disabled={disabled}
            error={invalid}
            onChange={onChange}
            value={value}
            type={type}
            size={size}
            InputProps={{
              className: classes.input,
            }}
            sx={
              !label
                ? {
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }
                : {}
            }
          />
          <FormHelperText
            style={{ color: "red", fontWeight: "bold" }}
            error={invalid}
          >
            {error?.message}
          </FormHelperText>
        </>
      )}
    />
  );
}

export default InputField;
