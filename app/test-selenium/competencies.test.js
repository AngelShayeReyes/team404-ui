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
        await driver.findElement(By.xpath("/html/body/div[3]/button")).click()  
        let innerText = await driver.findElement(By.xpath('//*[@id="Leadership1"]/table/thead/tr/th')).getText(); 	
        assert.equal(innerText, 'Personal Performance');     
    });

    it('Check "Consultant>Working With Others" description title from API is being displayed', async function(){ 
        await driver.findElement(By.xpath("/html/body/div[3]/button")).click()  
        await driver.findElement(By.xpath("/html/body/div[24]/button")).click()  
        let innerText = await driver.findElement(By.xpath('//*[@id="Consultant2"]/table/tbody/tr[1]/td/b')).getText(); 	
        assert.equal(innerText, 'Mobilises self and others to drive self-improvement');     
    });

    it('Check "Senior Associate>Supporting and Delivering the strategy" description from API is being displayed', async function(){ 
        await driver.findElement(By.xpath("/html/body/div[24]/button")).click()  
        await driver.findElement(By.xpath("/html/body/div[31]/button")).click()  
        let innerText = await driver.findElement(By.xpath('//*[@id="Senior_Associate4"]/table/tbody/tr[2]/td')).getText(); 	
        assert.equal(innerText, 'Organisational awareness\nRecognises and reflects on how personal actions may have a wider impact on other people and teams.');     
    });

    it('Check Trainee table is not shown as default', async function() {    
        let innerText = await driver.findElement(By.id("Trainee4")).getCssValue("display");
        assert.equal(innerText, 'none'); 
    });

    it('Check Executive table is shown when button is pressed', async function() {
        await driver.findElement(By.xpath("/html/body/div[31]/button")).click()  
        await driver.findElement(By.xpath("/html/body/div[59]/button")).click()       
        let innerText = await driver.findElement(By.id("Executive1")).getCssValue("display");
        assert.equal(innerText, 'block'); 
    });

    it('Check homepage button link goes back to navigation', async function() {
        await driver.findElement(By.xpath("/html/body/div[2]/a")).click()    
        let page_header = await driver.findElement(By.id("page_title")).getText(); 	
        assert.equal(page_header, 'Kainos Job Application');       
    });

    after(() => driver && driver.quit());
    
})