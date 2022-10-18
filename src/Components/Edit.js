import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack"
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import './Edit.css'

export default function FormDialog({data,setData,userId}) {
  const [open, setOpen] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();
  
    //searching the user , for which we are going to update values
  const searchUser = data.find((user) =>user.id === userId);


  const [input,setInput] = React.useState({
    name:searchUser.name,
    email:searchUser.email,
    role:searchUser.role
  })

  //Destructuring the object input
  const {name,role,email} = input;

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleChange = (event) =>{
    let id = event.target.id
    let value = event.target.value

    setInput((values) => ({...values, [id] : value}));
  }

  const submitData = () => {
    const ans = data.map((item)=>{
        if(item.id===userId){
            return {...item, ...input}
        }
        return item;
    });
    //console.log(ans);
    setData(ans);
    setOpen(false);
    enqueueSnackbar("Data Updated successfully ", { variant: "success" });
  }

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <BorderColorIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            placeholder={name}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            placeholder={email}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="role"
            label="Role"
            type="text"
            fullWidth
            variant="standard"
            placeholder={role}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitData}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
