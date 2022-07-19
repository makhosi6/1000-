import { readCSV } from './helpers';
// import { prepareCSV } from './job/csv';
import { Browser } from "../node_modules/puppeteer/lib/types";
const puppeteer = require("puppeteer");

import { task } from "./job/words";

const launch = async (): Promise<Browser> =>
  await puppeteer.launch({
    headless: false,
    userDataDir: "./cache/user_dir",
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

let alphaArr = ['0','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
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