
/**
 * 封包處理
 * @module app.js
 */

"use strict";

/**
 * 封包處理
 */
const packageHandler = () => {

	let express = require("express");
	let path = require("path");
	// let favicon = require("serve-favicon");
	let cookieParser = require("cookie-parser");
	let bodyParser = require("body-parser");
	let helmet = require("helmet");
	// const utility = require("./helper/Utility.js");

	let app = express();

	/* setup morgan for log*/
	const fs = require("fs");
	const format = require("date-format");
	let accessLogStream = fs.createWriteStream(path.resolve(__dirname, "log/log_"+ format("yyyy-MM-dd",new Date()) +".log"), {flags: "a+"});
	const morgan = require("morgan");
	morgan.token("req-body", function (req) { return (req.url === "/login")?"":JSON.stringify(req.body); });
	app.use(morgan(		":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :req-body",
		{	stream: accessLogStream,
			skip: (req, res) => {
				let monitorConfig = require("./MonitorConfig");
				//ignore ip
				for(let i=0; i < monitorConfig[process.env.NODE_ENV].developers.ip.length; i++){
					let expression = new RegExp(monitorConfig[process.env.NODE_ENV].developers.ip[i]);
					return (expression.exec(req.connection.remoteAddress) === null)?false:true;
				}
				//[TODO]ignore it account?
				return false;
			}
		}));

	/* setup helmet*/
	app.use(helmet());

	// view engine setup
	app.set("views", path.join(__dirname, "views"));
	app.set("view engine", "ejs");

	// include bootstraps
	app.use("/js", express.static(path.resolve(__dirname,"./node_modules/jquery/dist")));
	app.use("/js", express.static(path.resolve(__dirname,"./node_modules/popper.js/dist/")));
	app.use("/js", express.static(path.resolve(__dirname,"./node_modules/bootstrap/dist/js"))); 
	app.use("/css", express.static(path.resolve(__dirname,"./node_modules/bootstrap/dist/css")));

	// include bootstraps select
	app.use("/css", express.static(path.resolve(__dirname,"./node_modules/bootstrap-select/dist/css")));
	app.use("/js", express.static(path.resolve(__dirname,"./node_modules/bootstrap-select/dist/js")));

	// include octicons
	app.use("/svg", express.static(path.resolve(__dirname,"./node_modules/octicons/build/svg")));
	

	/*system info setting*/
	// app.use(utility.systemInfoHandler);

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, "public")));
	
	/* Auth */
	app.use(require(path.resolve(__dirname,"./helper/Auth")));

	/* Routes */
	const routePolicy = require(path.resolve(__dirname,"./helper/RoutePolicy"));
	for(let i=0; i < routePolicy.length; i++){
		app.use(routePolicy[i].url, require( path.resolve(__dirname,"routes") + routePolicy[i].dir));
	}
	
	// catch 404 and forward to error handler
	app.use( (req, res, next) => {
		const error =  require("./helper/CustodianCustWebError");
		next(new error.NotFoundError());
	});

	// error handler
	app.use( (err, req, res, next) => {

		const systemInformation = require("./helper/SystemInformation");
		const error =  require("./helper/CustodianCustWebError");

		// set locals, only providing error in development
		res.locals.message = (err.message)? err.message : new error.InternalServerError().message;
		res.locals.error = req.app.get("env") === "development" ? err : {};
		
		// render the error page
		res.status(err.status || new error.InternalServerError().status).render("error", { 
			"title": systemInformation.getSystemTitle(),
			"page_title": "Error",
			"user_profile" : req.user_profile
		});
	});

	return app;
};

module.exports = packageHandler();
