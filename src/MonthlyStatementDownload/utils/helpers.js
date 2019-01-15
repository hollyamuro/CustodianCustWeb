"use strict";

/**
 * @param  {Number} n=0 產出幾個月
 * 假設現在是2018/08/31, n=6, 產出['2018/07','2018/06','2018/05','2018/04','2018/03','2018/02']
 */
export const getLeastNMonth = (n = 0) => {
	let returnValue = [];
	for (let i = 1; i <= n; i++) {
		returnValue.push(i);
	}

	return [...(returnValue.map((i) => {
		let pre = new Date((new Date).setMonth((new Date).getMonth() - i));
		return returnValue = pre.getFullYear() + "/" + (((pre.getMonth() + 1) >= 10) ? "" : "0") + (pre.getMonth() + 1);
	}))];
};
