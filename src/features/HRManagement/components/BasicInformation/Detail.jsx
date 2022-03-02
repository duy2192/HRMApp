import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    overflowY: "scroll",
    width: "100%",
    height:"400px"
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
function Detail({ personnel }) {
  const classes = useStyles();
  return (
      <Box className={classes.root} >
        <Grid container>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Mã nhân viên:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{personnel.id}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Họ tên:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{personnel.ten}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Giới tính:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{personnel.gioitinh}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Ngày sinh:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{personnel.ngaysinh}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Dân tộc:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{personnel.dantoc}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Tôn giáo:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{personnel.tongiao}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Quốc tịch:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{personnel.quoctich}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>CMND/CCCD:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{personnel.cccd}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Ngày cấp:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{personnel.ngaycap}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Nơi cấp:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{personnel.noicap}</Typography>
          </Grid>
        </Grid>
      
      </Box>
  );
}

export default Detail;
