"use strict";

/**
 * 將Object Array轉成欲匯出XLSX之資料格式
 * @param  {Array.<Object>} data 欲匯出XLSX之資料
 * @return {Array.<Array.<String>>} XLSX之資料格式
 */
export const getXLSXFormat = (data) => {

    if (data.length === 0) return [];

    let allKeys = [];
    data.map((row) => {
        Object.keys(row).map((key) => {
            if (!allKeys.includes(key)) allKeys.push(key);
        });
    });
    return [allKeys, ...data.map((row) => (allKeys.map((key) => ((row.hasOwnProperty(key)) ? row[key] : ''))))];

};
