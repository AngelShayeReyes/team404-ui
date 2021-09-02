require('chromedriver');
const assert = require('assert');
const { json } = require('express');
const {Builder, Key, By, until} = require('selenium-webdriver');
const script = require('jest');
 
const url = 'http://localhost:7999/viewcompetencies'

describe('Checkout Kainos Competencies for the Engineering Capability', function () {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);
    });

    it('Check webpage is up, running and showing the correct view', async function() {
        let page_header = await driver.findElement(By.id("page_title")).getText(); 	
        console.log(JSON.stringify(page_header));
        assert.equal(page_header, 'Kainos Competencies for the Engineering Capability');              
    });

    it('Check Leadership Band competency from API is being displayed', async function(){ 
        let innerText = await driver.findElement(By.xpath('//*[@id="Leadership1"]/table/thead/tr/th')).getText(); 	
        assert.equal(innerText, 'Personal Performance');     
    });

    it('Check "Principal>Working With Others" description title from API is being displayed', async function(){ 
        let innerText = await driver.findElement(By.xpath('//*[@id="Consultant2"]/table/tbody/tr/td[1]/b')).getText(); 	
        assert.equal(innerText, 'Mobilises self and others to drive self-improvement');     
    });

    it('Check "Senior Associate>Supporting and Delivering the strategy" description from API is being displayed', async function(){ 
        let innerText = await driver.findElement(By.xpath('//*[@id="Senior_Associate4"]/table/tbody/tr/td[2]')).getText(); 	
        assert.equal(innerText, 'Organisational awareness\nRecognises and reflects on how personal actions may have a wider impact on other people and teams.');     
    });

    it('Check Trainee table is shown as default', async function() {    
        let innerText = await driver.findElement(By.id("Trainee4")).getCssValue("display");
        assert.equal(innerText, 'block'); 
    });

    it('Check Leadership table is hidden which button is pressed', async function() {
        await driver.findElement(By.xpath("/html/body/div[2]/button")).click()       
        let innerText = await driver.findElement(By.id("Leadership1")).getCssValue("display");
        assert.equal(innerText, 'none'); 
    });


    after(() => driver && driver.quit());
    
})