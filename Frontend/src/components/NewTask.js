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

export class NewTask extends React.Component {
    constructor(props){
        super(props);
        this.state={descripcion:"",responsable:{name:"",email:""},status:"",dueDate:new Date()};
        this.handleSumit=this.handleSumit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }

    render(){
        return (
        <React.Fragment>
            <CssBaseline />
            <form className="layout" onSubmit={this.handleSumit} >
                <Paper className="paper">
                    <Typography variant="h2">New Task</Typography>
                    <Avatar className="avatar">
                        <InboxIcon />
                    </Avatar>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel>Description</InputLabel>
                        <Input id="descripcion" name="descripcion" type="text"/>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel>Responsible</InputLabel>
                        <Input id="responsable" name="responsable" type="text" />
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
                    <Input type="file" id="file" onChange={this.handleInputChange}/>
                    <br/>
                    <br/>
                    <Button type="submit" variant="contained" color="primary">
                        Add
                    </Button>
                    <br/>
                    <Link href="/Home" variant="body2"> back </Link>
                </Paper>
            </form>
        </React.Fragment>
        );
    }

    handleInputChange(e) {
        this.setState({
            file: e.target.files[0]
        });                
    }

    handleClose(){
        this.setOpen(false);
    };
    
    handleOpen(){
      this.setOpen(true);
    };


    handleSumit(e){
        /**e.preventDefault();
        if (!this.state.descripcion.length || !this.state.responsable.name.length || !this.state.status.length){
          return;
        }
        if (localStorage.getItem("items") === null) {
          var items = [this.state];
          localStorage.setItem("items", JSON.stringify(items));
        } else {
          let items = JSON.parse(localStorage.getItem("items"));
          items.push(this.state);
          localStorage.setItem("items", JSON.stringify(items));
        }
        document.location.href = "/Home";**/
        let task ={
            descripcion: document.getElementById("descripcion").value,
            dueDate: document.getElementById("dueDate").value,
            responsable: document.getElementById("responsable").value,
            status: document.getElementById("status").value
        }
        console.log(task);

    };
}