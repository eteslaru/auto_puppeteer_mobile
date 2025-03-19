import BasePage from './BasePage.js';
import Tester from './Tester.js';

class LoginPage extends BasePage {
    static username = "e.teslaru@gmail.com"; 
    static password = "@Utomation123"; 
    static usernameInputElement = "//input[@id='login-username']"; 
    static passwordInputElement = "//input[@id='login-password']"; 
    static loginButton = "//button[@id='login-submit']";
    
    
    constructor() {
        super(); 
    }

    static async login() {
        console.log("Starting login");
        await this.waitUntilElementIsDisplayed(passwordInputElement)
        await this.clickElement(passwordInputElement)
        await this.inputText(this.passwordInputElement, this.password);
        // await this.inputText(this.usernameInputElement, this.username);
        // await this.clickElement(this.loginButton);
        console.log("Login success");
    }

    static async test(){
        const test = new Tester("LoginTest");
        await test.start();
        try {
            console.log("Test started");
           //click "De acord"
           await LoginPage.clickElement("//button[contains(@class, 'mde-consent-accept-btn')]")
           //await LoginPage.waitUntilElementIsDisplayed("//p[contains(@class, 'claim') and contains(text(), 'Importaţi automobile')]")
           
           //go to login
           await LoginPage.clickElement("//a[contains(@class, 'btn') and contains(text(), 'Conectare')]")
           await LoginPage.login()     
        } 
        catch (error) {
            console.error(`Test failed: ${error.message}`);
        }
        finally{
            LoginPage.unlockBrowser()
        }
        //await LoginPage.closeBrowser()
        await test.end()
    }
}





export default LoginPage;