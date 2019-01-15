import { combineReducers } from "redux";
import { isLoading } from "./loadings";
import { isMsgShown, msg } from "./message";
import { 
	queryPositionDate, account, isin, queryMaturityDate,
	holding, balance
} from "./safekeeping";

export default combineReducers({
	queryPositionDate, 
	account, 
	isin, 
	queryMaturityDate,
	holding, 
	balance,
	isLoading,
	isMsgShown,
	msg,
});

