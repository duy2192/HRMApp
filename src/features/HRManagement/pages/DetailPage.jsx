import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BasicInformation from "../components/BasicInformation";
import Contact from "../components/Contact";
import Contract from "../components/Contract";
import Discipline from "../components/Discipline";
import Jobs from "../components/Jobs";
import Level from "../components/Level";
import Position from "../components/Position";
import Reward from "../components/Reward";
import Salary from "../components/Salary";
import Insurance from "../components/Insurance";
import { personnelApi } from "api";
import NotFound from "components/NotFound";
import Grow from "@mui/material/Grow";
import CircularProgress from "@mui/material/CircularProgress";
import avatar from "assets/img/avatar.jpg";

const useStyles = makeStyles({
  submit: {
    display: "flex",
    top: 0,
    justifyContent: "center",
    color: "#ff4757",
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function DetailPage() {
  const [value, setValue] = React.useState(0);
  const [personnel, setPersonnel] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const { personnelid } = useParams();
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await personnelApi.get(personnelid);
        setPersonnel(result.results);
        setLoading(false);
      } catch (error) {}
    })();
  }, [personnelid]);
  return (
    <>
      {!!personnel && (
        <>
          <Paper className={classes.root}>
            <Box
              style={{
                paddingTop: "30px",
                paddingLeft: "30px",
                marginBottom: "20px",
              }}
            >
              <Avatar
                src={avatar}
                sx={{
                  height: "80px",
                  width: "80px",
                  marginLeft: "20px",
                  marginBottom: "10px",
                }}
              ></Avatar>
            </Box>
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: 1000 }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  height: "150vh",
                }}
              >
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    minWidth: "190px",
                  }}
                >
                  <Tab label="Thông tin cơ bản" {...a11yProps(0)} />
                  <Tab label="Thông tin liên hệ" {...a11yProps(1)} />
                  <Tab label="Trình độ" {...a11yProps(2)} />
                  <Tab label="Chức vụ" {...a11yProps(3)} />
                  <Tab label="Hợp đồng lao động" {...a11yProps(4)} />
                  <Tab label="Quá trình công tác" {...a11yProps(5)} />
                  <Tab label="Lương" {...a11yProps(6)} />
                  <Tab label="Khen thưởng" {...a11yProps(7)} />
                  <Tab label="Kỷ luật" {...a11yProps(8)} />
                  <Tab label="Bảo hiểm" {...a11yProps(9)} />
                </Tabs>
                <TabPanel value={value} index={0} style={{ width: "100%" }}>
                  <BasicInformation personnelid={personnelid} />
                </TabPanel>
                <TabPanel value={value} index={1} style={{ width: "100%" }}>
                  <Contact personnelid={personnelid} />
                </TabPanel>
                <TabPanel
                  value={value}
                  index={2}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Level personnelid={personnelid} />
                </TabPanel>
                <TabPanel
                  value={value}
                  index={3}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Position personnelid={personnelid} />
                </TabPanel>
                <TabPanel
                  value={value}
                  index={4}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Contract personnelid={personnelid} />
                </TabPanel>
                <TabPanel
                  value={value}
                  index={5}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Jobs personnelid={personnelid} />
                </TabPanel>
                <TabPanel
                  value={value}
                  index={6}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Salary personnelid={personnelid} />
                </TabPanel>
                <TabPanel
                  value={value}
                  index={7}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Reward personnelid={personnelid} />
                </TabPanel>
                <TabPanel
                  value={value}
                  index={8}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Discipline personnelid={personnelid} />
                </TabPanel>
                <TabPanel
                  value={value}
                  index={9}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Insurance personnelid={personnelid} />
                </TabPanel>
              </Box>
            </Grow>
          </Paper>
        </>
      )}
      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "300px" }}
        >
          <CircularProgress disableShrink size={100} />
        </Box>
      )}

      {!personnel && !loading && <NotFound />}
    </>
  );
}
