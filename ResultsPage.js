import BasePage from './BasePage.js';
import { expect } from 'chai';


class ResultsPage extends BasePage {
    static cautareDetaliataBtn = '//a[contains(@class,"js-adjustable-dsp-link") and normalize-space()="Căutare detaliată"]';
    static resultPageElement = `//h3[normalize-space(.)='Căutare detaliată: Automobile – noi sau second-hand']`;
    static afisareRezultateBtn = `//input[contains(@class, 'js-show-results')]`;
    static afisare50RezultateBtn = `//a[contains(@class, 'pagination-number') and text()='50']`;
    static resultElements = `//div[@class='g-row js-ad-entry']`;
    static resultPageExpText = 'Căutare detaliată: Automobile – noi sau second-hand';
    static carListElement = 'select#makeModelVariant1Make';
    static inputMinHpElement = '#minPower';
    static hpValue = '400';
    static McLarenOption = '137';
    static regexModel = /alt="McLaren\s([A-Za-z0-9\s&;]+)/;


        
    constructor() {
        super(); 
    }

    static async extractDetailsOfEachResultFromPage() {
        await ResultsPage.page.waitForSelector('div.g-row.js-ad-entry');
    
        const resultsList = await ResultsPage.page.$$eval(
            'div.g-row.js-ad-entry', divs => divs.map(div => div.textContent.trim()));
    
        if (!Array.isArray(resultsList)) {
            throw new Error('Rezultatul nu este un array!');
        }
    
        const results = resultsList.map(entry => {
            const modelMatch = entry.match(/McLaren ([\w\s\/\-\&\+°]+?)(?=\d{2}\/\d{4}|[A-Z])/); // model 
            const yearMatch = entry.match(/(\d{2})\/(\d{4})/); // luna/anul
            const hpMatch = entry.match(/\((\d+)\s*CP\)/); // cai putere
    
            return {
                model: modelMatch ? modelMatch[1].trim() : null,
                year: yearMatch ? yearMatch[2] : null,
                horsepower: hpMatch ? parseInt(hpMatch[1], 10) : null
            };
        });
    
        console.log(results);
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
            await ResultsPage.extractDetailsOfEachResultFromPage()
            // await MainPage.clickElement(MainPage.spanishBtn)
            // await MainPage.clickElement(MainPage.deAcordBtn)
               
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