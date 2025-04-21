import BasePage from './BasePage.js';
import { expect } from 'chai';


class MainPage extends BasePage {
    static roMessageDisplayed = "//div/p[@class='claim hidden-s' and text()='Importaţi automobile din Germania şi din toată Europa']";
    static spMessageDisplayed = "//div/p[@class='claim hidden-s' and text()='Coches importados desde Alemania y toda Europa']";
    static expectedTextRo = "Importaţi automobile din Germania şi din toată Europa"
    static expectedTextSp = "Coches importados desde Alemania y toda Europa"
    static expectedUrl = "//www.mobile.de/es"
    static languageBtn = "//li[contains(@class,'header-meta-item-language-selector')]/span[contains(@class,'header-meta-action-toggle')]"
    static spanishBtn = "//li[contains(@class,'header-meta-action-dropdown-item') and .//span[normalize-space()='Español']]//a"
    
    
    constructor() {
        super(); 
    }

    static async testChangeLanguage(){
        try {
            console.log("Test started");
            await MainPage.navigate(); 
            await MainPage.waitUntilElementIsDisplayed(MainPage.roMessageDisplayed,MainPage.expectedTextRo)
            await MainPage.clickElement(MainPage.languageBtn)
            await MainPage.clickElement(MainPage.spanishBtn)
            await MainPage.clickElement(MainPage.deAcordBtn)
            await MainPage.waitUntilElementIsDisplayed(MainPage.spMessageDisplayed,MainPage.expectedTextSp)  
            const actualUrl = await MainPage.page.url()
            expect(actualUrl).to.contain(MainPage.expectedUrl)
        } 
        catch (error) {
            console.error(`Test failed: ${error.message}`);
        }
        finally{
            MainPage.unlockBrowser()
        }

        await MainPage.closeBrowser()
    }
}

export default MainPage;