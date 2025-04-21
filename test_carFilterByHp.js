import ResultsPage from './ResultsPage.js';
import Tester from './Tester.js';

(async () => {
    const test = new Tester("Login Test");

    await test.start();
    console.log("Test started");

    await ResultsPage.testCarFilterByHp()

    console.log("Test ended")
    await test.end()
})();