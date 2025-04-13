import fs from 'fs';

class Tester {
    constructor(testName) {
        this.startTime = Date.now();
        this.testName = testName;
        this.endTime = null;
        this.logs = [];
        this.logFilePath = `Logs/${this.testName}_${Date.now()}.txt`;
    }

    logMessageWithCurrentTime(messageString) {
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        
        const message = { [time]: messageString };
        this.logs.push(message);
    }

    async start() {
        console.log(`Starting test: ${this.testName}`);
        this.logMessageWithCurrentTime('Test started');
    }

    async end() {
        console.log(`Test passed: ${this.testName}`);
        this.logMessageWithCurrentTime('Test finished');

        const logData = JSON.stringify(this.logs, null, 2);
        fs.writeFileSync(this.logFilePath, logData);
        console.log(`Logs saved in ${this.logFilePath}`);
    }
}

export default Tester;

