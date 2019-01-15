/**
 * 系統路由架構
 * @module helper/RoutePolicy
 */

"use strict";

module.exports = [
	/*URL <=> PHYSICAL PAGE*/

	/* 系統框架 */
	{ url: "/",                 	dir: "/SystemFrameRoute"},
	{ url: "/verify",               dir: "/UserVerifyRoute"},
	{ url: "/resetpassword",		dir: "/UserResetRoute"},

	/* 其他系統資訊 */
	{ url: "/helper",               dir: "/HelperRoute"},

	/* custodian - dashboard */
	{ url: "/dashboard", 			dir: "/DashboardRoute"},

	/* custodian cust - data inquiry */
	{ url: "/S001C001F001", 		dir: "/S001_custodian/C001_data_inquiry/F001_position_inquiry_route"},
	{ url: "/S001C001F002", 		dir: "/S001_custodian/C001_data_inquiry/F002_not_charge_off_history_route"},
	{ url: "/S001C001F003",         dir: "/S001_custodian/C001_data_inquiry/F003_charge_off_history_route"},
	{ url: "/S001C001F004",         dir: "/S001_custodian/C001_data_inquiry/F004_safekeeping_route"},

	/* custodian cust - data Download */
	{ url: "/S001C002F001",         dir: "/S001_custodian/C002_data_download/F001_monthly_statement_download_route"},

	/* personal setting */
	{ url: "/S099C001F001",         dir: "/S099_setting/C001_personal_setting/F001_password_reset_route"},
	
	// /*固收託管庫存查詢系統*/
	// /*Add New Route Here:...*/	
];

