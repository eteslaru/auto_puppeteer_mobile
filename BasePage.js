import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { expect } from 'chai';

puppeteer.use(StealthPlugin());

class BasePage {
    static browser = null;
    static page = null;
    static baseUrl = 'https://www.mobile.de/ro';
    static isLocked = true;
    static deAcordBtn = "//button[contains(@class, 'mde-consent-accept-btn')]"

    //  Inițializează browserul și pagina (Singleton)
    static async init() {
        if (!BasePage.browser) {
            console.log("Launching browser");
            BasePage.browser = await puppeteer.launch({ 
                headless: false,
                args: ['--window-size=1920,1080'] });
        }
        if (!BasePage.page) {
            console.log("Creating a new page");
            BasePage.page = await BasePage.browser.newPage();
            await BasePage.page.setViewport({width: 1920, height: 800});
            await BasePage.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36')
        }
        console.log('Base page este.....',BasePage.page)
        return BasePage.page;
    }
    //function to print salut
    static async navigate(url = BasePage.baseUrl) {
        await BasePage.init();
        if (!BasePage.page) {
            console.error("page is not initialized.");
            return;
        }
        console.log(`Navigating to ${url}`);
        await BasePage.page.goto(url);
        await BasePage.clickElement(BasePage.deAcordBtn);
    }

    static unlockBrowser() {
        BasePage.isLocked = false;
        console.log("Browser lock deactivated");
    }

    static async closeBrowser() {
        if (BasePage.isLocked) {
            console.log("Browser is locked.");
            return;
        }

        if (BasePage.browser) {
            console.log("Closing browser...");
            await BasePage.browser.close();
            BasePage.browser = null;
            BasePage.page = null;
        }
    }

    static async clickElement(element_str){
        let elementType = element_str.startsWith("//") ? 'xpath' : 'css' 
        try{
            if(elementType === 'xpath'){
                let xpathPrefix = '::-p-xpath'
                try{
                    await BasePage.page.waitForSelector(`${xpathPrefix}(${element_str})`);
                }
                catch{
                    console.log('Element not found in page ', element_str)
                }   
                await BasePage.page.evaluate(element => {
                    let el = document.evaluate(element, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    if (el) el.click();
                }, element_str);
            }
            
            else{
                await BasePage.page.waitForSelector(element_str);
                await BasePage.page.click(element_str);           
            }
        }    
        catch(error){
            console.error(`clickElement failed: ${error.message}`);
        }
    }

    static async writeText(element_str, text ){
        try {
            console.log('Waiting for input element to be displayed:', element_str);
            await BasePage.page.waitForSelector(element_str)
            await BasePage.page.type(element_str, text, { delay: 100 });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        } 
    }

    static async waitUntilElementIsDisplayed(element_str, expected_text, timeout = 5000) {
        try {
           const textInElement= await BasePage.page.evaluate(element => {
                console.log('textxxxxxxxxxxxxxxxxxx')
                let el = document.evaluate(element, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (el){
                    let text = el.textContent;
                    console.log('TEXTUl ESTE',text);  
                }
                return text
            }, element_str);
            expect(textInElement).to.equal(expected_text)
            
            
        } catch (error) {
            console.error(error);
            return false;
        } 
    }


}

export default BasePage;
