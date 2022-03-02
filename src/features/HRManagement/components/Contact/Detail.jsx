import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    overflowY: "scroll",
    height: "300px",
    width: "100%",
  },
  label: {
    padding: "10px",
    fontSize: "18px",
    color:"#2d3436",
    fontWeight:"lighter"
  },
  info: {
    padding: "10px",
    fontSize: "18px",
  },
});
function Contact({ personnel }) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <Grid container>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography className={classes.label}>Email:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography className={classes.info}>{personnel.email}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography className={classes.label}>Số điện thoại:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography className={classes.info}>{personnel.sdt}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography className={classes.label}>Tỉnh/TP:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography className={classes.info}>{personnel.tp}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography className={classes.label}>Quận/Huyện:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography className={classes.info}>{personnel.quan}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography className={classes.label}>Phường/Xã:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography className={classes.info}>{personnel.phuong}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography className={classes.label}>Số nhà/Đường phố:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography className={classes.info}>{personnel.diachi}</Typography>
          </Grid>
          
        </Grid>
      
      </Box>
    </>
  );
}

export default Contact;
