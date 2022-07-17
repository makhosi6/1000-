const createObjectCsvWriter = require('csv-writer').createObjectCsvWriter;
const nodeBase64 = require('nodejs-base64-converter');
// const fs = require("fs");
// console.log(nodeBase64.encode("test text")); //dGVzdCB0ZXh0
// console.log(nodeBase64.decode("dGVzdCB0ZXh0"));
const csvWriter = (filename) => createObjectCsvWriter({
    append: true,
    path: `../data/csv/${filename}.csv`,
    header: [
        { id: '_key', title: 'key', },
        { id: '_title', title: 'title' },
        { id: "_category", title: 'category' }
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
const prepareCSV = () => {
    ['z'].map((alpha) => {
        console.log(__dirname);
        console.log(__filename);
        const allFileContents = require("fs").readFileSync(`E:/F drive/projects/1000-/src/data/${alpha}.txt`, "utf-8");
        const records = (allFileContents.split(/\r?\n/)).map((item) => {
            return { _key: nodeBase64.encode(item), _title: item, _category: alpha };
        });
        console.log({ records });
        csvWriter(alpha).writeRecords(records)
            .then(() => {
            console.log('...Done ', alpha);
        });
    });
};

require("puppeteer");
// alphaArr.map(alpha => launch().then((browser) => task(browser, alpha, '1')));
// launch().then((br) => {
//   try {
//     task(br, "0", "1");
//   } catch (error) {
//     console.log("++++++");
//   }
// });
// alphaArr.map(a => readCSV(a))
prepareCSV();
//# sourceMappingURL=index.js.map
