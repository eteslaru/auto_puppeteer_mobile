import puppeteer from 'puppeteer';
import fs from 'fs';
import { expect } from 'chai';
import { url } from 'inspector';

// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false,
  args: ['--start-maximized']
});
const page = await browser.newPage();
const reqArr = [];
const respArr =[];
page.on('request', request => {
  const requestData = {
    url: request.url(),
    method: request.method(),
    headers: request.headers(),
    payload: request.postData() || null
  };
  console.log('req', request)
  for (let key in request) {
    if(request[key] === "_redirectChain") {
      break;
    }
    if(request.url()=== "https://reqres.in/api/users"){
      reqArr.push(requestData);
    }
  };
});

page.on('response', response => {
  respArr.push(response.url())
  console.log(response.url());
});


// Navigate the page to a URL.
await page.goto('https://reqres.in/');

await page.setViewport({width: 1920, height: 1080});

await page.locator('::-p-xpath(//div[@class="endpoints"]//li[@data-id ="post"])').click();

await new Promise(resolve => setTimeout(resolve, 10000));

const logFilePath = 'req_logs.json';

fs.writeFileSync(logFilePath, JSON.stringify(reqArr, null, 2));

const logFilePath1 = 'res_logs.json';
fs.writeFileSync(logFilePath1, JSON.stringify(respArr, null, 2));

const reqFile = JSON.parse(fs.readFileSync(logFilePath, 'utf-8'));

const targetRequest = reqFile.find(req => req.url === "https://reqres.in/api/users");
let expectedPayload = '{"name":"morpheus","job":"leader"}'
if (targetRequest) {
  expect(expectedPayload).to.equal(targetRequest.payload)
  console.log("Test has passed")
} else {
  console.log("No request found for 'https://reqres.in/api/users'");
}

await browser.close();
