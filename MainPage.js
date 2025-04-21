import BasePage from './BasePage.js';


class MainPage extends BasePage {
    static roMessageDisplayed = "//div/p[@class='claim hidden-s' and text()='Importaţi automobile din Germania şi din toată Europa']";
    static expectedText = "Importaţi automobile din Germania şi din toată Europa"
    
    constructor() {
        super(); 
    }

    static async testChangeLanguage(){
        try {
            console.log("Test started");
            await MainPage.navigate(); 
            await MainPage.waitUntilElementIsDisplayed(MainPage.roMessageDisplayed,MainPage.expectedText)

            // await LoginPage.clickElement("//button[contains(@class, 'mde-consent-accept-btn')]")
            // await LoginPage.clickElement("//a[@data-google-interstitial='false' and contains(@class, 'header-login-button') and contains(@href, 'login.mobile.de')]")
            // await LoginPage.login()     
        } 
        catch (error) {
            console.error(`Test failed: ${error.message}`);
        }
        finally{
            MainPage.unlockBrowser()
        }

        //await MainPage.closeBrowser()
    }
}

export default MainPage;