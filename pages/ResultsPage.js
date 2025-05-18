import BasePage from './BasePage.js';
import { expect } from 'chai';
import config from '../testData.config.json' assert { type: 'json' };

class ResultsPage extends BasePage {
    static cautareDetaliataBtn = '//a[contains(@class,"js-adjustable-dsp-link") and normalize-space()="Căutare detaliată"]';
    static resultPageElement = `//h3[normalize-space(.)='Căutare detaliată: Automobile – noi sau second-hand']`;
    static totalResultsElement = `//div/@data-result-count`;
    static afisareRezultateBtn = `//input[contains(@class, 'js-show-results')]`;
    static afisare50RezultateBtn = `//a[contains(@class, 'pagination-number') and text()='50']`;
    static resultElements = `//div[@class='g-row js-ad-entry']`;
    static totalResulstElement = `//div[contains(@class, 'js-search-result-header')]`;
    static resultPageExpText = 'Căutare detaliată: Automobile – noi sau second-hand';
    static carListElement = 'select#makeModelVariant1Make';
    static resulstListElement = 'div.g-row.js-ad-entry';
    static inputMinHpElement = '#minPower';
    static hpValue = config.test_carFilterByHp.values.hpValue;
    static McLarenOption = config.test_carFilterByHp.values.McLarenOption;

        
    constructor() {
        super(); 
    }

    static async extractDetailsOfEachResultFromPage() {
        await ResultsPage.page.waitForSelector(ResultsPage.resulstListElement);
        const resultsList = await ResultsPage.page.$$eval(
            ResultsPage.resulstListElement, divs => divs.map(div => div.textContent.trim()));
            
        if (!Array.isArray(resultsList)) {
            throw new Error('Rezultatul nu este un array!');
        }
        console.log("Lista este ......",resultsList)
        const pageResults = resultsList.map(entry => {
            const modelMatch = entry.match(/alt="(\w+\s\w+)/); // model 
            const yearMatch = entry.match(/>.*?(\d{2}\/\d{4})/); // luna/anul
            const hpMatch = entry.match(/\((\d+)\s*CP\)/); // cai putere
    
            return {
                model: modelMatch ? modelMatch[1].trim() : null,
                year: yearMatch ? yearMatch[1] : null,
                horsepower: hpMatch ? parseInt(hpMatch[1], 10) : null
            };
        });
        console.log(pageResults);
        return pageResults
    }

    static async clickNextPageIfExists() {
        const nextPageSelector = 'a.pagination-nav.pagination-nav-right';
        const nextPageExists = await ResultsPage.page.$(nextPageSelector);
    
        if (nextPageExists) {
            console.log('Butonul de pagină următoare a fost găsit. Se face click...');
            await Promise.all([
                ResultsPage.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                ResultsPage.page.click(nextPageSelector)
            ]);
            return true
        } else {
            console.log('Nu există buton de pagină următoare.');
            return false
        }
    }

    static async extractAllResultsFromAllPages() {
        let allResults = [];
        let hasNextPage = true;

        while (hasNextPage) {
            const results = await ResultsPage.extractDetailsOfEachResultFromPage();
            allResults.push(...results);
            hasNextPage = await ResultsPage.clickNextPageIfExists();
        }
        console.log('Toate rezultatele extrase:', allResults);
        return allResults.length;
    }

    static async getResultCount(elementXPath) {
        const xpathPrefix = '::-p-xpath';
        try {
            await BasePage.page.waitForSelector(`${xpathPrefix}(${elementXPath})`);
        } catch (error) {
            console.log('Element not found in page', elementXPath);
            return null;
        }
        const resultCount = await ResultsPage.page.evaluate((element) => {
            const el = document.evaluate(
                element,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
    
            if (el) {
                return parseInt(el.getAttribute('data-result-count'), 10);
            }
    
            console.log('Get result element was not found');
            return null;
        }, elementXPath);
    
        return resultCount;
    }
    
    
    

    static async testCarFilterByHp(){
        try {
            console.log("Test started");
            await ResultsPage.navigate(); 
           
            await ResultsPage.clickElement(ResultsPage.cautareDetaliataBtn)
            await ResultsPage.clickElement(ResultsPage.deAcordBtn);
            await ResultsPage.waitUntilElementIsDisplayed(ResultsPage.resultPageElement,ResultsPage.resultPageExpText)
            await ResultsPage.selectOption(ResultsPage.carListElement,ResultsPage.McLarenOption)
            await ResultsPage.clickElement(ResultsPage.afisareRezultateBtn)
            await ResultsPage.clickElement(ResultsPage.afisare50RezultateBtn)
            let actualFilteredResultCount = await ResultsPage.extractAllResultsFromAllPages()
            let expectedResultCount = await ResultsPage.getResultCount(ResultsPage.totalResulstElement)
            expect(actualFilteredResultCount).equal(expectedResultCount);
        } 
        catch (error) {
            console.error(`Test failed: ${error.message}`);
        }
        finally{
            ResultsPage.unlockBrowser()
        }

        //await ResultsPage.closeBrowser()
    }
}

export default ResultsPage;