import MainPage from './MainPage.js';
import Tester from './Tester.js';

(async () => {
    const test = new Tester("Login Test");

    await test.start();
    console.log("Test started");

    await MainPage.testChangeLanguage()

    console.log("Test ended")
    await test.end()
})();