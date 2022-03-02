import SearchIcon from "@mui/icons-material/Search";
import InputBase from '@mui/material/InputBase';
import { styled } from "@mui/material/styles";
import React from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(196, 196, 196, 0.32)",
  "&:hover": {
    backgroundColor: "#dcdde1",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "400px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function SearchBox({handleSearchBox}) {
  const handleOnchange=(e)=>{
    if(!handleSearchBox) return
    handleSearchBox(e.target.value)
  }
  return (
    <Search onChange={handleOnchange}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Tìm kiếm"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
}

export default SearchBox;
