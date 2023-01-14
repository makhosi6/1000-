import { readCSV } from "./helpers";
// import { prepareCSV } from './job/csv';
import { Browser } from "../node_modules/puppeteer/lib/types";
const cron = require("node-cron");
const puppeteer = require("puppeteer");

import { task } from "./job/words";
import { getBrowser, getState, setState, urbanDict } from "./job/urbanDict";

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
cron.schedule("* * * * *", async () => {
  await setState("urban_dict", 0);
  try {
    console.log("running a task every minute", Date.now());
   
    /**
     * get browser ws url
     */
    let currentBr: any = await getBrowser();

    let currentIndex: any = await getState();

    index = currentIndex?.index
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
      brwser: null,
      // brwser: currentBr.index,
      category: "lost",
    };
    urbanDict(params)
      .then(async () => {
        await setState("urban_dict", index + 1);
      })
      .catch(console.log);
  } catch (error) {
    console.log(error);
  }
});
