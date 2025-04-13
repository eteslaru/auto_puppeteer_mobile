
import LoginPage from './LoginPage.js';
import Tester from './Tester.js';

(async () => {
    const test = new Tester("Login Test");

    await test.start();
    console.log("Test started");

    await LoginPage.test()

    console.log("Test ended")
    await test.end()
})();



