module.exports.demo1_init = function(req, res, next) {

	// const message_handler = require("../../../helper/message_handler");        
    const debug = require("debug")("CustodianCustWeb:F001_demo1_controller.demo1_init");
    const systemInformation = require("../../../helper/SystemInformation");

	try{
        res.render("S001_custodian_web/C003_demo/F001_demo1", { 
            // default
            "title": systemInformation.getSystemTitle(),
            "page_title": systemInformation.getPageTitle(req.originalUrl),
            "user_profile" : req.session.user_profile,
            // "auth": systemInformation.getPageAuth(req.session.user_profile.permission, req.originalUrl),
            // options
            // "groups": groups.data.data,
            // "roles": roleList,
        });

	}catch(e){
        next(e);
	}
};

