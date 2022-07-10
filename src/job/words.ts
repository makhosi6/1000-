import { addToDB } from "./api";
import { Browser } from "../../node_modules/puppeteer/lib/types";
import { writeTxt } from "../helpers";

/**
 * 'var' statement declares a function-scoped or globally-scoped variable, so you will see 'var' in a number of place. DO PANIC!!
 * @param {Browser} browser
 * @param {string} search - a
 * @returns {object} data
 */
export const task = async (
  browser: Browser,
  search: string,
  currentPage: string
): Promise<any> => {
  try {
    var start = new Date();
    /**
     * URL/URI too visit
     */
    const URL = `https://www.merriam-webster.com/browse/dictionary/${search}/${currentPage}`;

    // open a new tab
    let page = await browser.newPage();

    //set up viewport size
    await page.setViewport({
      width: 1366,
      height: 768,
    });

    //visit/go-to page
    await page.goto(URL);

    //wait for the page to finish loading
    await page.waitForSelector(".mw-grid-table-list");

    /// check if current page is equal the visited page AND escape
    let pageNumberEl = await page.$(".pagination .active a");
    let pageNumber = await page.evaluate(
      (text) => text.innerText,
      pageNumberEl
    );
    console.log(currentPage != pageNumber);
    if (currentPage != pageNumber) {
      console.log("CLOSE🛑⛔❌");
      setTimeout(async () => {
        (await browser.pages()).map((page) => page.close());
      }, 5000);

      return;
    }
    // get all words
    const list = await page.$$(
      "body > div.outer-container > div > div.main-wrapper.clearfix > div.lr-cols-area.clearfix.sticky-column.d-flex > div.left-content > div > div:nth-child(3) > div > ul > li"
    );

    var words = Array.from([...list]);
    console.log(words.length);
    // get a add to a txt file
    words.map(
      async (word) =>
        await page
          .evaluate((text) => text.innerText, word)
          .then(async (raw) => {
            console.log({ word: raw });
            // save text
            writeTxt(raw)

            //
            await addToDB(raw);

          })
    );

    ///do more work
    await task(browser, search, String(Number(currentPage) + 1));
    ///
    console.log({
      search,
      currentPage,
      start,
      end: new Date(),
    });

    //
  } catch (error) {
    console.log("=-=-=-=-=");
    console.log(error);
  }
};
