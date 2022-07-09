import { Browser } from "../node_modules/puppeteer/lib/types";
const puppeteer  = require('puppeteer-core');

import {task} from './job/words'



const launch = async () : Promise<Browser> => await puppeteer.launch({
  headless: false,
  userDataDir: './data/user_dir'
});


let alphaArr = ['0','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
launch().then(browser => alphaArr.map(alpha => task(browser, alpha, '1')));



