/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const fs = require('fs');
/**
 * @description add a new entry on the file mentioned below(/words.text), every item will be add on a new line
 * @param {string} data
 * @param {string} file - filename
 * @returns
 */
const writeTxtUrban = (data, file) => fs.writeFile(`./src/data/urban/${file}.txt`, "\n" + data, { flag: 'a+' }, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log(`The ${file}.urban.txt file was saved! `, data);
});

const request = require("request");
const fetch = (...args) => 
//@ts-ignore
import('node-fetch').then(({ default: fetch }) => fetch(...args));
const pptr = require("puppeteer");
/**
 * hit urban dict
 * @param {string} param.url
 * @param {never} param.category
 * @param {never} param.brwser
 */
function urbanDict(param = {
    url: "",
    category: "",
    brwser: null,
}) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // deconstruct
            const { brwser, url, category } = param;
            console.log({
                url,
                BROWSER: brwser,
            });
            /**
             * browser object
             */
            const browser = brwser
                ? yield pptr.connect({ browserWSEndpoint: brwser })
                : yield pptr.launch({
                    headless: false,
                    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
                });
            /** page */
            var page = yield browser.newPage();
            /**
             * Set page viewPort
             */
            yield page.setViewport({
                width: 1366,
                height: 768,
            });
            /**
             * go to URL
             */
            yield page.goto(url);
            /**
             * wait for the DOM to load
             */
            yield page.waitForSelector(".pagination.text-xl.text-center");
            const listWrapper = yield page.$('ul[class*="colum"]');
            const items = (yield (listWrapper === null || listWrapper === void 0 ? void 0 : listWrapper.$$("li > a"))) || [];
            Array.from(items).map((item) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                let str = yield page.evaluate((text) => text.innerText, item);
                let character = (_b = (_a = new URL(url).searchParams) === null || _a === void 0 ? void 0 : _a.get("character")) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase();
                writeTxtUrban(str, character === "*" ? "character" : character || "lost");
            }));
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setTimeout(() => {
                page.close();
            }, 4500);
        }
    });
}
function setState(id = "urban_dict", index) {
    return __awaiter(this, void 0, void 0, function* () {
        var options = {
            method: "PUT",
            url: `http://192.168.0.134:3004/records/${id}`,
            headers: {
                "Content-Type": "application/json",
            },
            ///  "id": "a", "task": "a","index": 90000, "process_id":"angle"
            body: JSON.stringify({
                id,
                task: id,
                index: index,
                process_id: index,
            }),
        };
        request(options, function (error, response) {
            if (error)
                throw new Error(error);
            console.log("\x1b[45m%s\x1b[0m", "Memory/State UrbanDict updated ==> ", id, " : ", response.statusCode);
        });
    });
}
/**
 * @description  get list of Links to be scapped
 * @returns
 */
function getState(id = "urban_dict") {
    return __awaiter(this, void 0, void 0, function* () {
        ///
        const response = yield fetch(`http://192.168.0.134:3004/records/${id}`);
        ///
        const data = yield response.json();
        return Object.assign({ index: 0 }, data);
    });
}
/*
 * @param {string} id
 * @returns {Object}
 */
function getBrowser(id = "browser") {
    return __awaiter(this, void 0, void 0, function* () {
        ///
        const response = yield fetch(`http://192.168.0.134:3003/memory/${id}`);
        ///
        const data = yield response.json();
        console.log({ data });
        return data;
    });
}

const cron = require("node-cron");
require("puppeteer");
// const launch = async (): Promise<Browser> =>
//   await puppeteer.launch({
//     headless: false,
//     userDataDir: "./cache/user_dir",
//     executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//   });
// let alphaArr = ['0','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
// alphaArr.map(alpha => launch().then((browser) => task(browser, alpha, '1')));
// launch().then((br) => {
//   try {
//     task(br, "0", "1");
//   } catch (error) {
//     console.log("++++++");
//   }
// });
// alphaArr.map(a => readCSV(a))
// prepareCSV()
let json = require("../../src/data/urban/url_list.json");
let index = -1;
cron.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    // await setState("urban_dict", 0);
    try {
        console.log("running a task every minute", Date.now());
        /**
         * get browser ws url
         */
        let currentBr = yield getBrowser();
        let currentIndex = yield getState();
        index = currentIndex === null || currentIndex === void 0 ? void 0 : currentIndex.index;
        if (json.list.length < index) {
            console.log("DONEE => index", index);
            return;
        }
        console.log({
            json: json.list.length,
            currentIndex,
            index,
            currentBr,
        });
        let params = {
            url: json.list[index],
            // brwser: null,
            brwser: currentBr.index,
            category: "lost",
        };
        urbanDict(params)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            yield setState("urban_dict", index + 1);
        }))
            .catch(console.log);
    }
    catch (error) {
        console.log(error);
    }
}));
//# sourceMappingURL=index.js.map
