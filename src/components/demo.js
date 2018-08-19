"use strict";

import React from "react";
import ReactDOM from "react-dom";

class Demo extends React.Component {
	render() {
		return (
			<div>This is react demo page.</div>
		);
	}
}

ReactDOM.render(<Demo />, document.getElementById("demo"));