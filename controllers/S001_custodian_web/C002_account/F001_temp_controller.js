module.exports.data_inquiry1_init = function(req, res, next) {

	// const message_handler = require("../../../helper/message_handler");        
    // const debug = require("debug")("CustodianCustWeb:F001_data_inquiry1_controller.data_inquiry1_init");
    const systemInformation = require("../../../helper/SystemInformation");

	try{
        res.render("S001_custodian_web/C002_data/F001_temp", { 
            // default
            "title": systemInformation.getSystemTitle(),
            "page_title": systemInformation.getPageTitle(req.originalUrl),
            "user_profile" : req.user_profile
            // "auth": systemInformation.getPageAuth(req.user_profile.permission, req.originalUrl),
            // options
            // "groups": groups.data.data,
            // "roles": roleList,
        });

	}catch(e){
        next(e);
	}

};

