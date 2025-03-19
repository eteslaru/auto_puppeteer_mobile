import puppeteer from 'puppeteer';
import fs from 'fs';
import { expect } from 'chai';
import { url } from 'inspector';


const browser = await puppeteer.launch({
  headless: false,
  args: ['--start-maximized']
});
const page = await browser.newPage();

await page.goto('https://reqres.in/');

await page.setViewport({width: 1920, height: 1080});

//efectuez o actiune pentru a fi sigur ca sa incarcat pagina
await page.locator('::-p-xpath(//div[@class="endpoints"]//li[@data-id ="post"])').click();



// const endPointsButtons = await page.evaluate( async () =>{
//     //folosesc css pt ca e mult mai simplu cu xpath se complica
//     let endPointElements = document.querySelectorAll('.endpoints li')
//     return Array.from(endPointElements).map(el => el.textContent.trim());
// });

// console.log(endPointsButtons.length)
// console.log('endpoints', endPointsButtons)


//get local storage items

let localStorage = await page.evaluate( async () =>{
    // window.localStorage.setItem('setKey','Value')
    return JSON.stringify(window.localStorage)
});

console.log(typeof(localStorage))
console.log(localStorage)


 

await browser.close();


//clase si componenta per pagina - 
// main page 
// overview
// abstractii - Clase - Clasa - pagina ( metoda si proprietati)
// - Clasa Components - metode si proprietati - input / metoda care ia textul si scrie textul 
// clase de baza - cu inheriance - main page 

// prima data PAGE 
// proprietati si metode - are o pagina?  - verific url - ul!
//mai multe teste - sa ruleze pe categorii - suita
//sa configurez si un worker cumva 
// poate un job de git ?

// pentru dezvoltare viitoare cand am mai multe teste:
// o clasa gen pre test - in care am actiunile generale pentru a avea un mediu curat
// after test - sau clean up in care sterg tot / cache etc... delete din db ... 

//clasa Test  - metode proprietati 
//incepe testul / descriere, cat dureaza, logging, before test si after test.