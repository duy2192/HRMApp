import { Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { authApi } from "api";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "60px",
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
function UserInfo({ id }) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [loading  , setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const result =await authApi.get(id);
        setUser(result.results);
        setLoading(false)
        console.log(result);
      } catch (error) {}
    })();
  },[id]);
  return (
    <>
    {loading ? 
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "300px" }}
        >
          <CircularProgress disableShrink size={100} />
        </Box>
    :  
      <Box>
        <Paper className={classes.root}>
          <Typography
            style={{
              paddingTop: "30px",
              textAlign: "center",
              // fontWeight:",
              fontSize: "35px",
            }}
          >
            Thông tin tài khoản
          </Typography>

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
        <Box className={classes.submit}>
          <Button
            variant="contained"
            size="large"
            sx={{
              color: "#000000",
              background: "#f5f6fa",
              textTransform: "none",
              marginLeft: "20px",
            }}
          >
            Chỉnh sửa
          </Button>
        </Box>
      </Box>
      }
    </>
  );
}

export default UserInfo;
