import React from "react";
import Login from "../components/Login";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import background from "assets/img/background.jpg"
const useStyles = makeStyles({
  root: {
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    backgroundImage:`url(${background})`,
    minheight: "100%",
    height: "100vh",
    width:"auto"
  },
});
function LoginPage(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <div
        style={{
          paddingTop:"200px",
          height:"100%"
        }}
      >
        <Login />
      </div>
    </Box>
  );
}

export default LoginPage;
