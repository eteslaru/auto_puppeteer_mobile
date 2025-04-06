import BasePage from './BasePage.js';
import Tester from './Tester.js';

class LoginPage extends BasePage {
    static username = "e.teslaru@gmail.com"; 
    static password = "@Utomation123"; 
    static usernameInputElement = "input#login-username"; 
    static passwordInputElement = "input#login-password"; 
    static loginButton = "//button[@id='login-submit']";
    
    
    constructor() {
        super(); 
    }

    static async login() {
        console.log("Starting login");
        await this.inputText(LoginPage.passwordInputElement, LoginPage.password);
        await this.inputText(LoginPage.usernameInputElement, LoginPage.username);
       // await this.clickElement(LoginPage.loginButton);
        console.log("Login success");
    }

    static async test(){
        try {
            LoginPage.init()
            console.log("Test started");
            await LoginPage.clickElement("//button[contains(@class, 'mde-consent-accept-btn')]")
            await LoginPage.clickElement("//a[@data-google-interstitial='false' and contains(@class, 'header-login-button') and contains(@href, 'login.mobile.de')]")
            await LoginPage.login()     
        } 
        catch (error) {
            console.error(`Test failed: ${error.message}`);
        }
        finally{
            LoginPage.unlockBrowser()
        }

        //await LoginPage.closeBrowser()
       // await test.end()
    }
}





export default LoginPage;