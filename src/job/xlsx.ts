//loop over alpha

//read txt line by line

//save on excelFile

const fs = require("fs");
const csv = require("csv");


let alphaArr = [
  "0",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const loadToCSV = () => {
  let num = 1;

  alphaArr.map((alpha) => {
    const allFileContents = fs.readFileSync(`../data/${alpha}.txt`, "utf-8");

    var arrData = allFileContents.split(/\r?\n/)

    
    arrData.forEach((line: string) => {
        console.log(`Line ${num} from file: |${line}|`);
        console.log(arrData.length)
      num++;

// Run the pipeline
csv
// Generate 20 records
  .generate({
    delimiter: '|',
    length: arrData.length
  })
// Transform CSV data into records
  .pipe(csv.parse({
    delimiter: '|'
  }))
// Transform each value into uppercase
  .pipe(csv.transform((record: string[]) => {
    return record.map((value: string) => {
      return value.toUpperCase();
    });
  }))
// Convert objects into a stream
  .pipe(csv.stringify({
    quoted: true
  }))
// Print the CSV stream to stdout
  .pipe(process.stdout);


    });
  });
};


loadToCSV()