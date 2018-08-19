/**
 * 客戶用系統功能項架構(請記得跟客戶用前端同步)
 * @module helper/CustSystemHierarchy.js
 */

"use strict";

module.exports =  {
	"S001": { 
		id: "S001",
		name: "Custodian",
		description: "Custodian",
		"C001" : {
			id: "C001",
			name:  "Data Inquiry",
			description: "Data Inquiry",
			"F001" : { id: "F001", name: "部位查詢", description: "部位查詢", url: "/S001C001F001", auth: "", sensitive: false, },
			"F002" : { id: "F002", name: "未出帳查詢", description: "未出帳查詢", url: "/S001C001F002", auth: "", sensitive: false, },
			"F003" : { id: "F003", name: "已出帳查詢", description: "已出帳查詢", url: "/S001C001F003", auth: "", sensitive: false, },
		},
		"C002" : {
			id: "C002",
			name:  "Data Download",
			description: "Data Download",
			"F001" : { id: "F001", name: "Monthly Statement Download", description: "Monthly Statement Download", url: "/S001C002F001", auth: "", sensitive: false, },
		},
	},
	"S099": { 
		id: "S099",
		name: "Setting",
		description: "Setting",
		"C001" : {
			id: "C001",
			name:  "Personal Setting",
			description: "Personal Setting",
			"F001" : { id: "F001", name: "Password Reset", description: "Password Reset", url: "/S099C001F001", auth: "", sensitive: false, },
		},
	},
};
