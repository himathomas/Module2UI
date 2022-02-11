import React,{Component} from 'react';
import './taskUI.css';
import axios from 'axios';
//import ReactDOM from 'react-dom';

class TaskUI extends Component{
    constructor(props){
        super(props);
        this.state={
            taskname:"",
            description:"",
            file:"",
            associate:[],
            taskid:"",
            status:"New"
        }
        this.inputChange= this.inputChange.bind(this);
        this.submit= this.submit.bind(this);
        this.componentDidMount= this.componentDidMount.bind(this);
        this.onFileChange= this.onFileChange.bind(this);
    }

    inputChange(event){
        this.setState({ [event.target.name]:event.target.value });
        
    }
    onFileChange = event => {
        this.setState({ file: event.target.files[0] });
        console.log(event.target.files[0]);
    }
    
    submit(event){
        var data={
            taskname:this.state.taskname,
            description:this.state.description,
            file:this.state.file1,
            taskid:this.state.taskid,
            associate:this.state.sel,
            status:"new",

        }
           //console.log(data);
           //console.log(this.state.associate);
           const { taskname,description,taskid,associate} = this.state

           if( taskname && description && taskid && associate ){
            axios.post("http://localhost:3001/taskcreation/create",{data});
            console.log(data);
            alert("Submitted Successfully")
            }
            else{
                alert("failed");
            }
            
           
        //})
    }
    componentDidMount(){
        axios.get("http://localhost:3001/add/list/209096").then(response=>{
            //console.log(response);
            this.setState({associate:response.data})
        })
    } 

    render(){
        const {associate} = this.state;
        return(
        <div className="div8">
            
            <div className="div2">
                <label htmlFor="task">Task Name</label><br />               
                <input type="text"   className="taskname" name="taskname" placeholder="Enter Title" onChange={this.inputChange} ></input><br />
                <label htmlFor="task">Task ID</label><br />  
                <input type="text" className="taskname" name="taskid" placeholder="Enter Task ID" onChange={this.inputChange}></input>
                <label htmlFor="task">Task Description</label><br />
                <textarea className="description" name="description" onChange={this.inputChange}></textarea><br /><br /><br />
                <input type="file" className="file" name="file1" id="file" onChange={this.onFileChange}></input>
                <select className="sel" name="sel" onChange={this.inputChange}>
                        <option selected="selected" hidden disabled selected value>Select Associate</option>
                        {associate.map((item,index) => {
                          return <option value={item.name} key={index}>{item.name} </option>
                        })}
                </select>
                <button type="submit" className="submit" name="submit" onClick={this.submit}>Create Task</button>
            </div>
        </div>
    );
    }
}
export default  TaskUI;