import { Box, Paper, Grid, Typography } from "@mui/material";
import React from "react";

function Account({account}) {
  return (
    <Box>
      <Paper sx={{padding:"40px"}}>
        <Grid container style={{ paddingTop: "30px" }}>
          <Grid item lg={3} md={3} sm={3} xs={6} pl={5}>
            <Typography variant="body" style={{ fontWeight: "bold" }}>Họ tên</Typography>
          </Grid>
          <Grid item lg={5} md={5} sm={5} xs={6}>
            <Typography component="p" variant="body" >
              {account.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: "20px" }}>
        <Grid item lg={3} md={3} sm={3} xs={6} pl={5}>
            <Typography variant="body" style={{ fontWeight: "bold" }}>Email</Typography>
          </Grid>
          <Grid item lg={5} md={5} sm={5} xs={6}>
            <Typography variant="body" >
            {account.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Account;
