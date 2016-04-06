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
						<td style={{width: '12%'}}>Semester</td>
						<td style={{width: '30%'}}>Description</td>
						<td style={{width: '12%'}}>Credits</td>
						<td style={{width: '10%'}}></td>
					</tr>
					{this.state.courses.map(function(course) {
						return (
							<AdminCourse key={this.keys++} course={course} changePage={this.props.changePage}/>
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
		self.setState({courses: JSON.parse(data)});
		});
	}
});

var AdminCourse = React.createClass({
	render: function() {
		return (
			<tr><td><a onClick={this.edit}>{this.props.course.name}</a></td>
			<td>{this.props.course.courseCode}</td>
			<td>{this.props.course.semester}</td>
			<td>{this.props.course.description}</td>
			<td>{this.props.course.credits}</td>
			<td><img onClick={this.add} src="Images/edit.png" title="Edit Course" style={{height: '15px', width: '15px'}}/>&nbsp;&nbsp;
			<img onClick={this.props.remove} src="Images/delete.png" title="Remove Course" style={{height: '15px', width: '15px'}}/></td></tr>
		)
	},
	
	edit: function()
	{
		var cookie = cookieManager.addCookie('CourseInfo', JSON.stringify(this.props.course), 7)
		this.props.changePage(7)
	},
	
	add : function(newCourse)
	{
		var getting = this.state.courses
		getting.push(newCourse)
		this.setState({courses : getting})
	}
	
	
});