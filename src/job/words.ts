import { Browser } from "../../node_modules/puppeteer/lib/types";

/**
 * 'var' statement declares a function-scoped or globally-scoped variable, so you will see 'var' in a number of place. DO PANIC!!
 * @param {Browser} browser
 * @param {string} search - a
 * @returns {object} data
 */
export const task = async (  browser: Browser,  search: string,  currentPage: string): Promise<void> => {
  var start = new Date();
  try {
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
    let pageNumber = await page.evaluate((text) => text.innerText, pageNumberEl);
    if (currentPage != pageNumber) return;
    // get all words
    const list = await page.$$(
      ".d-flex .flex-wrap .align-items-baseline .row li"
    );

    var words = Array.from([...list]);
    // get a add to a txt file
    words.map(async (word) => {
      ///extract text
      let raw = await page.evaluate((text) => text.innerText, word);

      //
      console.log({ word: raw });

      //save text
      writeTxt(raw);
    });

    //close page
    await page.close();

    ///do more work
    await task(browser, search, String(Number(currentPage) + 1));

    //
  } catch (error) {
  } finally {
    console.log({
      search,
      currentPage,
      start,
      end: new Date(),
    });
  }
};
