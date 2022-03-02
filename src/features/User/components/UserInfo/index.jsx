import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    overflowY: "scroll",
    height: "350px",
    width: "100%",
  },
  label: {
    padding: "10px",
    fontSize: "18px",
    color: "#2d3436",
    fontWeight: "lighter",
  },
  info: {
    padding: "10px",
    fontSize: "18px",
  },
});
function UserInfo({ user }) {
  const classes = useStyles();
  return (
    <>
      <Box>
        <Paper>
            <Typography style={{
                paddingTop:"30px",
                textAlign:"center",
                // fontWeight:",
                fontSize:"35px"
            }}>Thông tin tài khoản</Typography>

          <Grid container>
            <Grid item lg={2} md={6} sm={5} xs={6}>
              <Typography className={classes.label}>Mã tài khoản:</Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={7} xs={6}>
              <Typography className={classes.info}>{user.id}</Typography>
            </Grid>
            <Grid item lg={2} md={6} sm={5} xs={6}>
              <Typography className={classes.label}>Họ tên:</Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={7} xs={6}>
              <Typography className={classes.info}>{user.name}</Typography>
            </Grid>
            <Grid item lg={2} md={6} sm={5} xs={6}>
              <Typography className={classes.label}>Tên tài khoản:</Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={7} xs={6}>
              <Typography className={classes.info}>{user.username}</Typography>
            </Grid>
            <Grid item lg={2} md={6} sm={5} xs={6}>
              <Typography className={classes.label}>Ngày sinh:</Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={7} xs={6}>
              <Typography className={classes.info}>{user.ngaysinh}</Typography>
            </Grid>
            <Grid item lg={2} md={6} sm={5} xs={6}>
              <Typography className={classes.label}>Dân tộc:</Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={7} xs={6}>
              <Typography className={classes.info}>{user.dantoc}</Typography>
            </Grid>
            <Grid item lg={2} md={6} sm={5} xs={6}>
              <Typography className={classes.label}>Tôn giáo:</Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={7} xs={6}>
              <Typography className={classes.info}>{user.tongiao}</Typography>
            </Grid>
            <Grid item lg={2} md={6} sm={5} xs={6}>
              <Typography className={classes.label}>Quốc tịch:</Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={7} xs={6}>
              <Typography className={classes.info}>{user.quoctich}</Typography>
            </Grid>
            <Grid item lg={2} md={6} sm={5} xs={6}>
              <Typography className={classes.label}>CMND/CCCD:</Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={7} xs={6}>
              <Typography className={classes.info}>{user.cccd}</Typography>
            </Grid>
            <Grid item lg={2} md={6} sm={5} xs={6}>
              <Typography className={classes.label}>Ngày cấp:</Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={7} xs={6}>
              <Typography className={classes.info}>{user.ngaycap}</Typography>
            </Grid>
            <Grid item lg={2} md={6} sm={5} xs={6}>
              <Typography className={classes.label}>Nơi cấp:</Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={7} xs={6}>
              <Typography className={classes.info}>{user.noicap}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default UserInfo;
