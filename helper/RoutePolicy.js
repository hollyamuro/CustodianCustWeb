/**
 * 系統路由架構
 * @module helper/RoutePolicy.js
 */

"use strict";

module.exports = [
	/*URL <=> PHYSICAL PAGE*/

	/* 系統框架 */
	{ url: "/",                 	dir: "/SystemFrameRoute"},

	/* data */
	{ url: "/S001C001F001",         dir: "/S001_custodian_web/C001_data/F001_data_inquiry1_route"},

	/* account */
	// { url: "/S001C002F001",         dir: "/S001_custodian_web/C002_account/F001_"},

	/* demo */
	{ url: "/S001C003F001",         dir: "/S001_custodian_web/C003_demo/F001_demo1_route"},
	
	// /*固收託管庫存查詢系統*/
	// /*Add New Route Here:...*/	
];

