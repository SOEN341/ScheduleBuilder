var serverBridge= realServerBridge;

var Main = React.createClass({
	getInitialState: function() {
		return {
			currentPage: this.props.currentPage
		}
	}, 
	render: function() {
		return (
			<div>
				{this.state.currentPage!=0 && this.state.currentPage!=6&&this.state.currentPage!=7? <div style={{textAlign:'center'}}><a onClick={this.openPreferencesPage}>Preferences</a> &#124; <a onClick={this.openSchedulePage}>Schedule</a> &#124; <a onClick={this.openAccountPage}>Account Management</a> &#124; <a onClick={this.logout}>Log Out</a></div>: null}
				{(this.state.currentPage==6)? <div style={{textAlign: 'center'}}><a onClick={this.logout}>Log Out</a></div>:null}
				{(this.state.currentPage==7)? <div style={{textAlign: 'center'}}><a onClick={this.openAdminCoursesPage}>Back to Courses Page</a> &#124; <a onClick={this.logout}>Log Out</a></div>:null}
				{this.state.currentPage==0? <LoginPage changePage={this.changePage}/>: null}
				{this.state.currentPage==1? <PreferencesPage changePage={this.changePage}/>: null}
				{this.state.currentPage==2? <AccountPage changePage={this.changePage}/>: null}
				{this.state.currentPage==3? <SchedulePage changePage={this.changePage}/>: null}
				{this.state.currentPage==4? <CourseSequencePage changePage={this.changePage}/>: null}
				{this.state.currentPage==6? <AdminPage changePage={this.changePage}/>: null}
				{this.state.currentPage==7? <AdminEdit changePage={this.changePage}/>: null}
			</div>
		)
	},
	
	changePage: function(newPage) {
		if(newPage==0) {
			window.location = linkProvider.getLink()+'/index';
		}
		else if(newPage==1) {
			window.location = linkProvider.getLink()+'/preferences';
		}
		else if(newPage==2) {
			window.location = linkProvider.getLink()+'/account';
		}
		else if(newPage==3) {
			window.location = linkProvider.getLink()+'/schedule';
		}
		else if(newPage==4) {
			window.location = linkProvider.getLink()+'/sequence';
		}
		else if(newPage==6) {
			window.location = linkProvider.getLink()+'/admin';
		}
		else if(newPage==7) {
			window.location = linkProvider.getLink()+'/admincourse';
		}
	},
	
	openLoginPage: function() {
		this.changePage(0);
	},
	
	openPreferencesPage: function() {
		this.changePage(1);
	},
	
	openAccountPage: function() {
		this.changePage(2);
	},
	
	openSchedulePage: function() {
		this.changePage(3);
	},
	
	openAdminCoursesPage: function() {
		this.changePage(6);
	},
	
	logout: function() {
		cookieManager.removeCookie('username');
		cookieManager.removeCookie('taken');
		cookieManager.removeCookie('prefs');
		cookieManager.removeCookie('needed');
		cookieManager.removeCookie('email');
		cookieManager.removeCookie('schedule');
		cookieManager.removeCookie('CourseInfo');
		this.changePage(0);
	}
});