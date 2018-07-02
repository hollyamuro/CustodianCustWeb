/**
 * 系統功能項架構
 * @module helper/SystemHierarchy.js
 */

"use strict";

module.exports =  {
	//System
	//固收託管庫存查詢系統PROFILE
	"S001": { id: "S001",
		name: "Custodian Web",
		description: "Custodian Web",
		//Directory
		"C001" : {
			id: "C001",
			name:  "Data",
			description: "Data",
			//Functions:    
			"F001" : { id: "F001", name: "Data Inquiry1", description: "Data Inquiry1", url: "/S001C001F001", auth: "", sensitive: false, },
			"F002" : { id: "F002", name: "Data Inquiry2", description: "Data Inquiry2", url: "/S001C001F002", auth: "", sensitive: false, },
			"F003" : { id: "F003", name: "Data Inquiry3", description: "Data Inquiry3", url: "/S001C001F003", auth: "", sensitive: false, },
			// "F010" : { id: "F010", name: "申報交易所資料", description: "申報交易所資料", url: "/S001C001F010", auth: "", sensitive: false, },
			/*Add New Function Here...*/
		},
		"C002" : {
			id: "C002",
			name:  "Account",
			description: "Account",
			//Functions:    
			"F001" : { id: "F001", name: "Password reset", description: "Password reset", url: "/S001C002F001", auth: "", sensitive: false, },
			/*Add New Function Here...*/
		},
		"C003" : {
			id: "C003",
			name:  "Demo",
			description: "Demo",
			//Functions:    
			"F001" : { id: "F001", name: "demo1", description: "demo1", url: "/S001C003F001", auth: "", sensitive: false, },
			"F002" : { id: "F002", name: "demo2", description: "demo2", url: "/S001C003F002", auth: "", sensitive: false, },
			"F003" : { id: "F003", name: "demo3", description: "demo3", url: "/S001C003F003", auth: "", sensitive: false, },
			/*Add New Function Here...*/
		},
		/*Add New Directory Here...*/
	},
	/*Add New System Here...*/
};
