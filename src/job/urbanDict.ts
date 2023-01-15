const request = require("request");
import { writeTxt, writeTxtUrban } from "./../helpers";
import { Browser } from "puppeteer";
const fetch = (...args: any) =>
  //@ts-ignore
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const pptr = require("puppeteer");

const state = {
  char: "w",
};
/**
 * hit urban dict
 * @param {string} param.url
 * @param {never} param.category
 * @param {never} param.brwser
 */
export async function urbanDict(
  param = {
    url: "",
    category: "",
    brwser: null,
  }
) {
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
    const browser: Browser = brwser
      ? await pptr.connect({ browserWSEndpoint: brwser })
      : await pptr.launch({
          headless: false,
          executablePath:
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        });
    /** page */
    var page = await browser.newPage();

    /**
     * Set page viewPort
     */
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    /**
     * go to URL
     */
    await page.goto(url);
    /**
     * wait for the DOM to load
     */
    await page.waitForSelector(".pagination.text-xl.text-center");

    const listWrapper = await page.$('ul[class*="colum"]');

    const items = (await listWrapper?.$$("li > a")) || [];

    Array.from(items).map(async (item) => {
      let str = await page.evaluate((text) => text.innerText, item);
      let character = new URL(url).searchParams
        ?.get("character")
        ?.toLocaleLowerCase();
      writeTxtUrban(str, character === "*" ? "character" : character || "lost");
    });
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      page.close();
    }, 4500);
  }
}

export async function setState(id = "urban_dict", index: any) {
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
  request(options, function (error: any, response: any) {
    if (error) throw new Error(error);
    console.log(
      "\x1b[45m%s\x1b[0m",
      "Memory/State UrbanDict updated ==> ",
      id,
      " : ",
      response.statusCode
    );
  });
}
/**
 * @description  get list of Links to be scapped
 * @returns
 */
export async function getState(id = "urban_dict") {
  ///
  const response = await fetch(`http://192.168.0.134:3004/records/${id}`);

  ///
  const data = await response.json();

  return { ...{ index: 0 }, ...data };
}

/*
 * @param {string} id
 * @returns {Object}
 */
export async function getBrowser(id = "browser") {
  ///

  const response = await fetch(`http://192.168.0.134:3003/memory/${id}`);

  ///
  const data = await response.json();

  console.log({ data });

  return data;
}

/**
 * Dynamically create all possible links
 */
function getList() {
  let letters = [
    { total: 1025, char: "A" },
    { total: 1477, char: "B" },
    { total: 1476, char: "C" },
    { total: 1156, char: "D" },
    { total: 457, char: "E" },
    { total: 958, char: "F" },
    { total: 828, char: "G" },
    { total: 767, char: "H" },
    { total: 575, char: "I" },
    { total: 607, char: "J" },
    { total: 575, char: "K" },
    { total: 671, char: "L" },
    { total: 1198, char: "M" },
    { total: 641, char: "N" },
    { total: 347, char: "O" },
    { total: 1193, char: "P" },
    { total: 118, char: "Q" },
    { total: 728, char: "R" },
    { total: 2313, char: "S" },
    { total: 1304, char: "T" },
    { total: 209, char: "U" },
    { total: 270, char: "V" },
    { total: 593, char: "W" },
    { total: 51, char: "X" },
    { total: 255, char: "Y" },
    { total: 165, char: "Z" },
    { total: 281, char: "*" },
  ];

  let out: Array<string> = [];

  letters.map((letter) => {
    for (let index = 1; index < Array(letter.total).length + 1; index++) {
      // letter.total - 1 === index && letter.char =÷
      out.push(
        `"https://www.urbandictionary.com/browse.php?character=${letter.char}&page=${index}"`
      );
    }
  });

  return out;
}
