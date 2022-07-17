const createObjectCsvWriter = require('csv-writer').createObjectCsvWriter;
const nodeBase64 = require('nodejs-base64-converter');
// const fs = require("fs");

// console.log(nodeBase64.encode("test text")); //dGVzdCB0ZXh0
// console.log(nodeBase64.decode("dGVzdCB0ZXh0"));


const csvWriter = (filename: string) => createObjectCsvWriter({
    append : true,
    path: `E:\F drive\projects\1000-\src\data\csv\e.csv`,
    header: [
        {id: '_key', title: 'key',  },
        {id: '_title', title: 'title'},
        {id:"_category",  title: 'category'}
    ]
});
 


//  [
//     "0",
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
// ]
export const prepareCSV =  () => {

    ['z'].map((alpha:string) => {
        
        console.log(__dirname)
        console.log(__filename)
        const allFileContents = require("fs").readFileSync(`E:/F drive/projects/1000-/src/data/${alpha}.txt`, "utf-8");
        
        const records : Array<object> = (allFileContents.split(/\r?\n/)).map((item: string): object => {
            
            return {_key: nodeBase64.encode(item),  _title: item, _category: alpha }
            
        })
        

        console.log({records})
      
            csvWriter(alpha).writeRecords(records)      
            .then(() => {
                console.log('...Done ', alpha);
            });
        })
    }