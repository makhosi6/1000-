'use strict';

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

const http = require("http");
const addToDB = (word, port = 3000) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ///
        const data = JSON.stringify({
            title: word,
            timestamp: new Date().getTime(),
        });
        ///
        const options = {
            hostname: "localhost",
            port: port,
            path: "/words",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": data.length,
            },
        };
        const req = http.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`);
            res.on("data", (d) => {
                process.stdout.write(d);
            });
        });
        req.on("error", (error) => {
            console.error(error);
            console.log({ word });
        });
        req.write(data);
        req.end();
    }
    catch (error) {
        console.log(error);
        console.log({ word });
        // addToDB(word, 3004);
    }
});
// {
//   "words": [
//   ]
// }

const fs = require('fs');
/**
 * @description add a new entry on the file mentioned below(/words.text), every item will be add on a new line
 * @param {string} data
 * @param {string} file - filename
 * @returns
 */
const writeTxt = (data, file) => fs.writeFile(`./src/data/${file}.txt`, "\n" + data, { flag: 'a+' }, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

/**
 * 'var' statement declares a function-scoped or globally-scoped variable, so you will see 'var' in a number of place. DO PANIC!!
 * @param {Browser} browser
 * @param {string} search - a
 * @returns {object} data
 */
const task = (browser, search, currentPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var start = new Date();
        /**
         * URL/URI too visit
         */
        const URL = `https://www.merriam-webster.com/browse/dictionary/${search}/${currentPage}`;
        // open a new tab
        let page = yield browser.newPage();
        //set up viewport size
        yield page.setViewport({
            width: 1366,
            height: 768,
        });
        //visit/go-to page
        yield page.goto(URL);
        //wait for the page to finish loading
        yield page.waitForSelector(".mw-grid-table-list");
        /// check if current page is equal the visited page AND escape
        let pageNumberEl = yield page.$(".pagination .active a");
        let pageNumber = yield page.evaluate((text) => text.innerText, pageNumberEl);
        console.log(currentPage != pageNumber);
        if (currentPage != pageNumber) {
            console.log("CLOSE🛑⛔❌");
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                (yield browser.pages()).map((page) => page.close());
            }), 5000);
            return;
        }
        // get all words
        const list = yield page.$$("body > div.outer-container > div > div.main-wrapper.clearfix > div.lr-cols-area.clearfix.sticky-column.d-flex > div.left-content > div > div:nth-child(3) > div > ul > li");
        var words = Array.from([...list]);
        console.log(words.length);
        // get a add to a txt file
        words.map((word) => __awaiter(void 0, void 0, void 0, function* () {
            return yield page
                .evaluate((text) => text.innerText, word)
                .then((raw) => __awaiter(void 0, void 0, void 0, function* () {
                console.log({ word: raw });
                // save text
                writeTxt(raw, search);
                //
                yield addToDB(raw);
            }));
        }));
        ///do more work
        yield task(browser, search, String(Number(currentPage) + 1));
        ///
        console.log({
            search,
            currentPage,
            start,
            end: new Date(),
        });
        //
    }
    catch (error) {
        console.log("=-=-=-=-=");
        console.log(error);
    }
});

const puppeteer = require("puppeteer");
const launch = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield puppeteer.launch({
        headless: false,
        userDataDir: "./cache/user_dir",
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    });
});
// let alphaArr = ['0','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
// alphaArr.map(alpha => launch().then((browser) => task(browser, alpha, '1')));
launch().then((br) => {
    try {
        task(br, "0", "1");
    }
    catch (error) {
        console.log("++++++");
    }
});
//# sourceMappingURL=index.js.map
