var AdminPage = React.createClass({
	getInitialState: function() {
		return {
			courses: []
		}
	},
	
	render: function() {
		return(
			<RBS.Table striped bordered hover style={{backgroundColor:'white', width:'98%', marginLeft:'1%'}}>
				<tbody>
					<tr>
						<td style={{width: '12%'}}>Class Name</td>
						<td style={{width: '12%'}}>Course Number</td>
						<td style={{width: '12%'}}>Course ID</td>
						<td style={{width: '12%'}}>Semester</td>
						<td style={{width: '30%'}}>Description</td>
						<td style={{width: '12%'}}>Credits</td>
						<td style={{width: '10%'}}></td>
					</tr>
					{this.state.courses.map(function(course) {
						return (
							<AdminCourse key={this.keys++} course={course}/>
						)
					}, this)}
				</tbody>
			</RBS.Table>
		)
	},
	
	componentDidMount: function() {
		this.keys=0;
		var self=this;
		serverBridge.getCourses(function(data) {
			self.setState({
				courses: data
			});
		});
	}
});

var AdminCourse = React.createClass({
	render: function() {
		return (
			<tr><td>{this.props.course.name}</td>
			<td>{this.props.course.courseCode}</td>
			<td>{this.props.course.courseID}</td>
			<td>{this.props.course.semester}</td>
			<td>{this.props.course.description}</td>
			<td>{this.props.course.credits}</td>
			<td><img src="Images/delete.png" title="Remove Course" style={{height: '15px', width: '15px'}}/></td></tr>
		)
	}
});