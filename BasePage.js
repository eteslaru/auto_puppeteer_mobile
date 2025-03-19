import puppeteer from 'puppeteer';
import { timeout } from 'puppeteer';

class BasePage {
    static browser = null;
    static page = null;
    static baseUrl = 'https://www.mobile.de/ro';
    static isLocked = true;

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
            BasePage.page.setViewport({width: 1920, height: 1080});
        }
        console.log('Base page este.....',BasePage.page)
    }

    static async navigate(url = BasePage.baseUrl) {
        await BasePage.init();
        if (!BasePage.page) {
            console.error("page is not initialized.");
            return;
        }
        console.log(`Navigating to ${url}`);
        await BasePage.page.goto(url);
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
                    //tre sa il bag intr-un element 
                    await BasePage.page.waitForSelector(`${xpathPrefix}(${element_str})`);
                }
                catch{
                    console.log('Element not found in page ', element_str)
                }
                    await BasePage.page.click('xpath/' + xpathExpression)
                // let el = await BasePage.page.$(`${xpathPrefix}(${element_str})`);
                // console.log('Element el is... ',el)
                // if (el.length > 0) {
                //     await el[0].click();
                //     console.log('Element clicked ',element_str)
                // } else {
                //     throw new Error("XPath element not found.");
                // }
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

    static async inputText(element_str, text, ){
        try {
            console.log('Waiting for input element to be displayed:', element_str);
            await BasePage.page.waitForTimeout(2000);
            await BasePage.page.type(element_str, text)
            return true;
        } catch (error) {
            console.error(`Input Element ${element_str} not displayed`);
            return false;
        } 
    }

    static async waitUntilElementIsDisplayed(element_str, timeout = 5000) {
        try {
            console.log('Waiting for  element to be displayed:', element_str);
            console.log('Elementul este', element_str)
            await BasePage.page.waitForSelector('body > header > div.header-navbar > div.header-corporate > p',timeout);
            return true;
        } catch (error) {
            console.error(`Element ${element_str} not displayed`);
            return false;
        } 
    }

}

export default BasePage;
