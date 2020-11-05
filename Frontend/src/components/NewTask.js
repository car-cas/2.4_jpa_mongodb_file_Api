import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider,KeyboardDatePicker} from "@material-ui/pickers";
import "./style.css"

export default function NewTask(props){

    const[file,setFile]=React.useState();

    const uploadFile = (task) =>{
        addTask(task);
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        fetch('http://localhost:8080/api/files', {
          method: 'POST',
          mode:'no-cors',
          body: formData
        }).then(function (response) {
          if (response.ok) {
            response.json().then(function (res) {
              console.log(res);
            })
          } else {
            console.log("")
          }
        }).catch(function (error) {
          console.log("Bad petition:" + error.message);
        });
    
    }

    const addTask = (task) => {
        fetch('http://localhost:8080/api/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json',
          },
          body: JSON.stringify(task)
        }).then(function (response) {
          if (response.ok) {
            response.json().then(function (res) {
              console.log(res);
            })
          } else {
            console.log("")
          }
        }).catch(function (error) {
          console.log("Bad petition:" + error.message);
        });
    }
    

    const handleSumit = (e) =>{
        let task ={
            descripcion: document.getElementById("description").value,
            priority: document.getElementById("priority").value,
            dueDate: document.getElementById("dueDate").value,
            responsable: document.getElementById("responsible").value,
            status: document.getElementById("status").value
        }
        console.log(task);
        uploadFile(task);
    };

    const handleInputChange=(e) =>{
        setFile(e.target.files[0]);  
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <form className="layout">    
                <Paper className="paper">
                    <Typography variant="h2">New Task</Typography>
                    <Avatar className="avatar">
                        <InboxIcon />
                    </Avatar>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel>Description</InputLabel>
                        <Input id="description" name="description" type="text"/>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Input id="priority" name="priority" type="text"/>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel>Responsible</InputLabel>
                        <Input id="responsible" name="responsible" type="text" />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel>Status (Ready/In Progress/Completed)</InputLabel>
                        <Input id="status" name="status" type="text"/>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                        <KeyboardDatePicker
                            margin="normal"
                            id="dueDate"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            fullWidth
                            KeyboardButtonProps={{"aria-label": "change date"}}
                        />
                    </MuiPickersUtilsProvider>
                    <br/>
                    <br/>
                    <Input type="file" id="file" onChange={handleInputChange}/>
                    <br/>
                    <br/>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSumit} >
                        Add
                    </Button>
                    <br/>
                    <Link href="/Home" variant="body2"> back </Link>
                </Paper>
            </form>
        </React.Fragment>
    );
}