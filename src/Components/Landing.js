import React, { useState, useEffect } from "react";
import "./Landing.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import usePagination from "./Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { Stack } from "@mui/system";
import Edit from "./Edit";
import Header from "./Header";
import Search from "./Search";

function App() {
  const [member, setMember] = useState([]);
  const [page, setPage] = useState(1);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedUser, setSelectedUser] = useState([]);


  //API endpoint Address
  const API_ENDPOINT = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;

  //Data from Api call
  const ApiCall = async () => {
    try {
      const res = await axios.get(API_ENDPOINT);
      if (res) {
        setMember(res.data);
        return null;
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    ApiCall();
  }, []);


  const headCell = [
    {
      id: 1,
      label: "Name",
    },
    {
      id: 2,
      label: "Email",
    },
    {
      id: 3,
      label: "Role",
    },
  ];

  // pagination component to display 10 user's data in one page
  const PER_PAGE = 10;
  const count = Math.ceil(member.length / PER_PAGE);
  const _DATA = usePagination(member, PER_PAGE);


  //display the result of the page selected at pagination
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };


  //deleting the single user from delete Icon 
  const deleteHandler = (userid) => {
    const list = member.filter((item) => item.id !== userid);
    enqueueSnackbar("Data Deleted successfully ", { variant: "warning" });
    setMember(list);
  };

  //Deleting all the selected users top checkbox(selectAll checkbox)
  const handleSelectAll = (e) => {
    let newList = [...selectedUser];
    if (e.target.checked) {
      setIsAllSelected(true);
      newList = _DATA.currentData().map((item) => item.id);
    } else {
      setIsAllSelected(false);
      newList = [];
    }
    setSelectedUser(newList);
  };



  //selecting each user from checkbox adding into selectedUser array
  const userSelect = (e) => {
    console.log(e.target.value);
    let user = e.target.value;
    let newList = [...selectedUser];

    if (e.target.checked) {
      newList = [...selectedUser, user];
    } else {
      setIsAllSelected(false);
      //console.log("splice",newList.splice(selectedUser.indexOf(user) ,1))
      newList.splice(selectedUser.indexOf(user), 1);
    }
    setSelectedUser(newList);
  };


  //deleting the selected users
  const deleteSelected = () => {
    const list = member.filter((item) => !selectedUser.includes(item.id));
    enqueueSnackbar("Data Deleted successfully ", { variant: "warning" });
    setIsAllSelected(false);
    //console.log(userid);
    setMember(list);
  };


  return (
    <>
      <Header />
      <Search member={member} setMember={setMember} />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          aria-labelledby="tableTitle"
          size="medium"
          responsive="true"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  color="primary"
                  onChange={handleSelectAll}
                  checked={isAllSelected}
                />
              </TableCell>

              {headCell.map((data) => (
                <TableCell sx={{ fontWeight: "bold" }} key={headCell.id}>
                  {data.label}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_DATA.currentData().map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox
                    color="primary"
                    onChange={userSelect}
                    value={row.id}
                    checked={selectedUser.includes(row.id)}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Edit data={member} setData={setMember} userId={row.id} />
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteHandler(row.id)}
                    >
                      <DeleteIcon sx={{ color: "crimson" }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Stack
          className="footbar"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            margin: "1rem",
          }}
        >
          <Button
            sx={{ borderRadius: "15px" }}
            variant="contained"
            color="error"
            onClick={deleteSelected}
          >
            Delete selected
          </Button>
          <Pagination
            // color="primary"
            count={count}
            size="large"
            page={page}
            variant="outlined"
            onChange={handleChange}
            showFirstButton
            showLastButton
            renderItem={(item) => (
              <PaginationItem
                components={{
                  first: KeyboardDoubleArrowLeftOutlinedIcon,
                  last: KeyboardDoubleArrowRightIcon,
                }}
                {...item}
              />
            )}
          />
        </Stack>
      </Box>
    </>
  );
}

export default App;

