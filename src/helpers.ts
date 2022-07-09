const fs = require('fs');


/**
 * @description add a new entry on the file mentioned below(/words.text), every item will be add on a new line
 * @param {string} data 
 * @returns 
 */
const writeTxt = (data: string) =>  fs.writeFile("/words.text", `\n${data}`, function(err: any) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});