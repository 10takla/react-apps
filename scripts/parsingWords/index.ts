import puppeteer from 'puppeteer';
import fs from 'fs';
import ts from 'typescript';

const tsCode = fs.readFileSync(`${__dirname}/recode.ts`, 'utf-8');

const compilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.CommonJS,
};

const result = ts.transpileModule(tsCode, { compilerOptions });
const jsCode = result.outputText.split('require("jquery");\r\n')[1]
    .split('(0, jquery_1.default)').join('$');

(async () => {
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
})();
