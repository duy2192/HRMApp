import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { contractApi, utilsApi } from "api";
import { convertTime } from "utils";
import ArticleIcon from "@mui/icons-material/Article";

const useStyles = makeStyles({
  root: {
    overflowY: "scroll",
    width: "100%",
    height: "400px",
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
    "&:hover": {
      color: "#0984e3",
    },
  },
});
function Detail({ contractid }) {
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await contractApi.get(contractid);
        setContract(result.results);
        setLoading(false);
      } catch (error) {}
    })();
  }, [contractid]);
  const classes = useStyles();
  const handleDownloadClick = async () => {
    try {
      await utilsApi.download(contract.file);
    } catch (error) {}
  };
  return (
    <Box className={classes.root}>
      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "150px" }}
        >
          <CircularProgress disableShrink size={50} />
        </Box>
      )}
      {!loading && (
        <Grid container>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>
              Mã hợp đồng:
            </Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>
              {contract.id}
            </Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>
              Loại hợp đồng:
            </Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>
              {contract.loaihd}
            </Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>
              Ngày ký:
            </Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>
              {convertTime(contract.ngayky)}
            </Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>
              Ngày kết thúc:
            </Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>
              {convertTime(contract.ngaykt)}
            </Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>
              Trạng thái:
            </Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>
              {contract.trangthai === 1 ? "Còn hiệu lực" : "Hết hiệu lực"}
            </Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>
              File đính kèm:
            </Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Box
              sx={{
                width: "250px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                display: "inline-block",
                cursor: "pointer",

              }}
            >
              <Typography variant="span" onClick={handleDownloadClick} className={classes.info}>
                <ArticleIcon htmlColor="#74b9ff" />
                {contract.file}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
export default Detail;
