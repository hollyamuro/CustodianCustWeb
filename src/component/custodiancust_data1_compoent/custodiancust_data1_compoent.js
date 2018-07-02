"use strict";

// import Axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import SelectField from "material-ui/SelectField";
// import MenuItem from "material-ui/MenuItem";
// import DatePicker from "material-ui/DatePicker";
// import RaisedButton from "material-ui/RaisedButton";

// import "../../../public/css/style.css";

class CustodiancustData1 extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			// for read,
			read_accounting_date: 	this.props.read_accounting_date,
		};

		this.get_render_component = this.get_render_component.bind(this);
	}

	get_render_component(){

		
		// return  ();
	}

	/* render screen */
	render() {
		return (    
			// <MuiThemeProvider><div>

			// 	{this.get_render_component(this.state.current_action)}

			// </div></MuiThemeProvider>
			
			<div> Hello . </div>
		);  
	}
}

CustodiancustData1.defaultProps = {
	//for read
	read_accounting_date: new Date(),
};


ReactDOM.render(   							
	<CustodiancustData1 />,
	document.getElementById("custodiancust-data1")
);


