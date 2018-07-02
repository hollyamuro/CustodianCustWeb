"use strict";

import React from "react";
import ReactDOM from "react-dom";

class Demo1 extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return ( 
            <div>This is react demo1 page.</div>
        )
    }
}
ReactDOM.render(
	<Demo1 />, 
	document.getElementById("demo1")
);