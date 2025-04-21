import BasePage from './BasePage.js';
import { expect } from 'chai';


class ResultsPage extends BasePage {
    static cautareDetaliataBtn = '//a[contains(@class,"js-adjustable-dsp-link") and normalize-space()="Căutare detaliată"]';
    static resultPageElement = `//h3[normalize-space(.)='Căutare detaliată: Automobile – noi sau second-hand']`;
    static resultPageExpText = 'Căutare detaliată: Automobile – noi sau second-hand';
    static carListElement = 'select#makeModelVariant1Make';
    static inputMinHpElement = '#minPower';
    static hpValue = '900';
    static porcheOption = '20100';


        
    constructor() {
        super(); 
    }

    static async testCarFilterByHp(){
        try {
            console.log("Test started");
            await ResultsPage.navigate(); 
           
            await ResultsPage.clickElement(ResultsPage.cautareDetaliataBtn)
            await ResultsPage.clickElement(ResultsPage.deAcordBtn);
            await ResultsPage.waitUntilElementIsDisplayed(ResultsPage.resultPageElement,ResultsPage.resultPageExpText)
            await ResultsPage.selectOption(ResultsPage.carListElement,ResultsPage.porcheOption)
            await ResultsPage.writeText(ResultsPage.inputMinHpElement, ResultsPage.hpValue);
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