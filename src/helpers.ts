const fs = require('fs');


/**
 * @description add a new entry on the file mentioned below(/words.text), every item will be add on a new line
 * @param {string} data 
 * @param {string} file - filename 
 * @returns 
 */
export const writeTxt = (data: string, file: string) =>  fs.writeFile(`./src/data/${file}.txt`, "\n"+data, { flag: 'a+' }, function(err: any) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

/// create a csv file
export const readCSV = (file: string) =>  fs.readFile(`./src/data/csv/${file}.csv`, { flag: 'a+' }, function(err: any, data: any) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!", data);
});