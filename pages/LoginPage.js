import BasePage from './BasePage.js';
import config from '../testData.config.json' assert { type: 'json' };

class LoginPage extends BasePage {
    static username = config.test_login.values.username; 
    static password = config.test_login.values.password;
    static usernameInputElement = "input#login-username"; 
    static passwordInputElement = "input#login-password"; 
    static loginButton = "//button[@id='login-submit']";
    
    
    constructor() {
        super(); 
    }

    static async login() {
        console.log("Starting login");
        await LoginPage.writeText(LoginPage.passwordInputElement, LoginPage.password);
        await LoginPage.writeText(LoginPage.usernameInputElement, LoginPage.username);
        await LoginPage.clickElement(LoginPage.loginButton);
        console.log("Login success");
    }

    static async test(){
        try {
            console.log("Test started");
            await LoginPage.navigate(); 
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
    }
}





export default LoginPage;