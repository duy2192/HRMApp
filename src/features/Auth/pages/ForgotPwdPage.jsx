import React from "react";
import ForgotPwd from "../components/ForgotPwd";
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
function ForgotPwdPage(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <div
        style={{
          paddingTop:"200px",
          height:"100%"
        }}
      >
        <ForgotPwd />
      </div>
    </Box>
  );
}

export default ForgotPwdPage;
