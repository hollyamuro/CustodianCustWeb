/**
 * 客戶用系統功能項架構(請記得跟後台CustSystemHierarchy同步)
 * @module helper/SystemHierarchy
 */

"use strict";

module.exports = {
	"S001": {
		id: "S001",
		name: "Custody",
		description: "",
		"C001": {
			id: "C001",
			name: "Data Inquiry",
			description: "",
			"F001": { id: "F001", name: "Account Balance", description: "", url: "/S001C001F001", auth: "", sensitive: false, },
			"F002": { id: "F002", name: "Entries in Transit", description: "", url: "/S001C001F002", auth: "", sensitive: false, },
			"F003": { id: "F003", name: "Journal of Entries", description: "", url: "/S001C001F003", auth: "", sensitive: false, },
			"F004": { id: "F004", name: "Account Balance", description: "擔保品部位查詢", url: "/S001C001F004", auth: "", sensitive: false, },
		},
		"C002": {
			id: "C002",
			name: "Data Download",
			description: "",
			"F001": { id: "F001", name: "Monthly Statement Download", description: "", url: "/S001C002F001", auth: "", sensitive: false, },
		},
	},
	"S099": {
		id: "S099",
		name: "Setting",
		description: "",
		"C001": {
			id: "C001",
			name: "Personal Setting",
			description: "",
			"F001": { id: "F001", name: "Password Reset", description: "", url: "/S099C001F001", auth: "", sensitive: false, },
		},
	},
};
