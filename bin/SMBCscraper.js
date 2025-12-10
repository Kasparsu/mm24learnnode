import * as cheerio from 'cheerio';
import fs from 'fs';
import md5 from 'md5';
import fetch from 'node-fetch';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const cacheDir = './cache';
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

const BASE_URL = 'https://www.smbc-comics.com';
let url = BASE_URL + '/';

async function scrapeComics() {
    for (let i = 0; i < 10; i++) {
        const cacheFile = cacheDir + `/${md5(url)}.html`;

        let body;
        if (fs.existsSync(cacheFile)) {
            body = fs.readFileSync(cacheFile, 'utf-8');
            console.log(`Used cache: ${url}`);
        } else {
            console.log(`Downloading: ${url}`);
            await sleep(1500);
            const res = await fetch(url);
            body = await res.text();
            fs.writeFileSync(cacheFile, body, 'utf-8');
        }

        const $ = cheerio.load(body);
        const img = $('#cc-comic');
        if (!img || !img.attr('src')) {
            console.log('Comic not found on page, exiting.');
            break;
        }

        let imgUrl = img.attr('src');
        if (!imgUrl.startsWith('http')) imgUrl = 'https:' + imgUrl;
        console.log(`Comic: ${imgUrl}`);
        console.log(`Alt text: ${img.attr('title') || img.attr('alt')}`);

        const prev = $('a[rel="prev"]');
        if (prev.length === 0) {
            console.log('Previous comic not found, exiting.');
            break;
        }
        let prevHref = prev.attr('href');
        url = prevHref.startsWith('http') ? prevHref : BASE_URL + prevHref;
    }
}

scrapeComics();
