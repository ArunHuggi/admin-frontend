import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from "@mui/material";
import "./Search.css";


export default function Seach({member,setMember}){
    const [debounceTimeout, setDebounceTimeout] = useState(0);
    const [searchText , setSearchText] = useState("");

    
  const searchData = (event, debounceTimeout) => {
    setSearchText(event.target.value);
    if (debounceTimeout !== 0) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      setMember(filter());
    }, 500);
    setDebounceTimeout(timeout);
  };

  //get the result of users using searchbox which can belong to any category

  const filter = () => {
    if (searchText !== "") {
      const result = member.filter((obj) =>
        Object.keys(obj).some((key) => obj[key].includes(searchText))
      );
      return result;
    } else {
      setMember(member);
      return member;
    }
  };

    return (
      <Box className="header2">
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          fullWidth
          onChange={(e) => {
            searchData(e, debounceTimeout);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search by Name, email or Role"
          name="search"
        />
      </Box>
    );
}