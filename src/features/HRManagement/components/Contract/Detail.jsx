import { Box, Grid, Typography } from "@mui/material";
import React,{useState,useEffect} from "react";
import { makeStyles } from "@mui/styles";
import { contractApi, utilsApi } from "api";
import DownloadIcon from '@mui/icons-material/Download';
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
    "&:hover":{
        color:"#0984e3"
    }
  },
});
function Detail({ contractid }) {
    const [contract, setContract] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
          try {
            setLoading(true);
            const result = await contractApi.get(contractid);
            setContract(result.results);
            setLoading(false);
          } catch (error) {}
        })();
      }, [contractid ]);
  const classes = useStyles();
  const handleDownloadClick=async()=>{
    try {
        await utilsApi.download(contract.file?.split("/")[3])
    } catch (error) {
        
    }
  }
  return (
      <Box className={classes.root} >
        <Grid container>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Mã hợp đồng:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{contract.id}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Loại hợp đồng:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{contract.loaihd}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Ngày ký:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{contract.ngayky}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Ngày kết thúc:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{contract.ngaykt}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>Trạng thái:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info}>{contract.trangthai==1?"Còn hiệu lực":"Hết hiệu lực"}</Typography>
          </Grid>
          <Grid item lg={2} md={6} sm={5} xs={6}>
            <Typography component="p" variant="body2" className={classes.label}>File đính kèm:</Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={7} xs={6}>
            <Typography component="p" variant="body2" className={classes.info} style={{
                cursor:"pointer",
            }} onClick={handleDownloadClick}><DownloadIcon/>{contract.file?.split("/")[3]}</Typography>
          </Grid>
        </Grid>
      
      </Box>
  );
}

export default Detail;