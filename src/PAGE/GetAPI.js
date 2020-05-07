import React, { Component } from 'react'
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

export class GetAPI extends Component {
	constructor(props) {
		super(props)
		this.state = {
			emp: [],
			rows: [],
		}
	}
	componentDidMount() {
		this.getEmployeeDetails();
	}

	getEmployeeDetails = () => {
		axios.get('http://dummy.restapiexample.com/api/v1/employees')
			.then(res => {
				this.setState({ emp: res.data.data });
				console.log("API RESPONSE", res.data);
			})
	}

	handleAddRow = () => {
    this.setState((prevState, props) => {
      const row = { content: "hello this is a new row!" };
      return { emp: [...prevState.rows, row] };
    });
  }
	render() {
		const { emp } = this.state;
		return (
			<div style={{ padding: '40px' }}>
				<Fab color="primary" aria-label="add" style={{float : 'right'}}>
					<AddIcon onClick={this.handleAddRow}/>
				</Fab>
				<table style={{ width: '100%', border: '1px solid grey', borderCollapse: 'collapse' }}>
					<thead>
						<tr>
							<th style={{ border: '1px solid grey' }}>Sl.No</th>
							<th style={{ border: '1px solid grey' }}>Employee Name</th>
							<th style={{ border: '1px solid grey' }}>Employee Age</th>
							<th style={{ border: '1px solid grey' }}>Employee Salary</th>
						</tr>
					</thead>
					{emp.map(item => (
						<tbody key={item.id}>
							<tr>
								<td style={{ border: '1px solid grey' }}>{item.id}</td>
								<td style={{ border: '1px solid grey' }}>{item.employee_name}</td>
								<td style={{ border: '1px solid grey' }}>{item.employee_age}</td>
								<td style={{ border: '1px solid grey' }}>{item.employee_salary}</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		)
	}
}

export default GetAPI
