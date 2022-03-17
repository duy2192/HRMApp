import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";

const useStyles = makeStyles({
  input: {
    background: "#fff",
    zIndex: "0",
  },
});
export default function CalendarField({ label, form, name, size }) {
  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, value, name },
        fieldState: { invalid, error },
      }) => (
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Stack spacing={3}>
            <DatePicker
              label={label}
              inputFormat="DD/MM/yyyy"
              value={value}
              onChange={onChange}
              renderInput={(params) => (
                <>
                <TextField
                  className={classes.input}
                  size={size}
                  fullWidth
                  {...params}
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
              </FormHelperText></>
              )}
            />
          </Stack>
        </LocalizationProvider>
      )}
    />
  );
}
