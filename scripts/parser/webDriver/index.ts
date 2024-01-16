import puppeteer from 'puppeteer';
import tsCompiler from '../tsCompiler';

export default async (path: string) => {
    const jsCode = tsCompiler(path);

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        devtools: true,
        args: ['--window-size=900,1000'],
    });
    const page = await browser.newPage();
    await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
    await page.goto('https://poliglot16.ru/slova/');

    await page.evaluate((jsCode) => {
        const script = document.createElement('script');
        script.text = jsCode;
        console.log(jsCode);
        document.head.appendChild(script);
    }, jsCode);
};
