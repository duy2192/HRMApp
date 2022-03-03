import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { personnelApi } from "api";
import React, { useEffect, useState } from "react";
import Detail from "./Detail";
import UpdateForm from "./UpdateForm";

const useStyles = makeStyles({
  root: {
    // height: "8000px",
    width: "100%",
  },
  submit: {
    display: "flex",
    top: 0,
    justifyContent: "center",
    color: "#ff4757",
  },
});
function BasicInformation({ personnelid }) {
  const classes = useStyles();
  const [mode, setMode] = useState("");
  const [personnel, setPersonnel] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const result = await personnelApi.get(personnelid);
        setPersonnel(result.results);
      } catch (error) {}
    })();
  }, [personnelid]);
  const handleSubmitUpdate = async (value) => {
    try {
      const data = {
        ...value,
        id: personnel.id,
      };
      const result = await personnelApi.update(data);
      setPersonnel(result.results);

      setMode("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateClick = () => {
    setMode("update");
  };
  return (
    <Box className={classes.root}>
      {mode === "" && <Detail personnel={personnel} />}
      {mode === "update" && (
        <UpdateForm personnel={personnel} onSubmit={handleSubmitUpdate} />
      )}
      {mode === "" && (
        <Box className={classes.submit}>
          <Button
            variant="contained"
            onClick={handleUpdateClick}
            size="large"
            sx={{
              color: "#000000",
              background: "#99CCFF",
              textTransform: "none",
            }}
          >
            Sửa
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default BasicInformation;
