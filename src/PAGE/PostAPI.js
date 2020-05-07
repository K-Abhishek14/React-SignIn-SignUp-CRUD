import React, { Component } from 'react'
import axios from 'axios';

export class PostAPI extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            employee_name : "",
            employee_age : "",
            employee_salary : "",
        }
    }

    changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
    onSubmit = (e) => {
        e.preventDefault();
        const employee = {
            name: this.state.employee_name,
            age: this.state.employee_age,
            salary: this.state.employee_salary,
        }
        axios.post('http://dummy.restapiexample.com/api/v1/employees', employee)
        .then(res => console.log(res.data));
    }
    
    render() {
        const {employee_name,employee_age,employee_salary} = this.state
        return (
            <div>
                NAME : <input type="text" name="employee_name"  value={employee_name} onChange={this.changeHandler}/><br />
                AGE : <input type="text"  name="employee_age" value={employee_age} onChange={this.changeHandler}/> <br />
                SALARY : <input type="text" name="employee_salary"  value={employee_salary} onChange={this.changeHandler}/> <br />
                <button onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}

export default PostAPI
