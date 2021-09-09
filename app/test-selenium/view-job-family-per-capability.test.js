require('chromedriver');
const assert = require('assert');
const { json } = require('express');
const {Builder, Key, By, until} = require('selenium-webdriver');
const script = require('jest');
 
const url = 'http://localhost:7999/viewjobfamilies'

describe('Checkout Job Family Per Capability', function () {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);
    });

    it('Check webpage is up, running and showing the correct view', async function() {
        let page_header = await driver.findElement(By.id("page_title")).getText(); 	
        console.log(JSON.stringify(page_header));
        assert.equal(page_header, 'Job Family Per Capability');              
    });

    it('Check engineering job families table is shown when button is pressed', async function() {
        await driver.findElement(By.xpath("/html/body/div[3]/button")).click()     
        let innerText = await driver.findElement(By.id("Engineering")).getCssValue("display");
        assert.equal(innerText, 'block'); 
    });

    it('Check engineering job families table is not shown as default', async function() {  
        await driver.findElement(By.xpath("/html/body/div[3]/button")).click()       
        let innerText = await driver.findElement(By.id("Engineering")).getCssValue("display");
        assert.equal(innerText, 'none'); 
    });

    it('Check Engineering job family name from API is being displayed', async function(){
        await driver.findElement(By.xpath("/html/body/div[3]/button")).click()  
        let innerText = await driver.findElement(By.xpath('//*[@id="Engineering"]/table/tbody/tr[1]/td[1]')).getText(); 	
        assert.equal(innerText, "Engineering Strategy and Planning");  
    });

    it('Check Engineering job title for a job family from API is being displayed', async function(){  
        let innerText = await driver.findElement(By.xpath('//*[@id="Engineering"]/table/tbody/tr[3]/td[2]')).getText();
        assert.equal(innerText, "Technical Architect");  
    });

    it('Check homepage button link goes back to navigation', async function() {
        await driver.findElement(By.xpath("/html/body/div[2]/a")).click()    
        let page_header = await driver.findElement(By.id("page_title")).getText(); 	
        assert.equal(page_header, 'Kainos Job Application');       
    });

    after(() => driver && driver.quit());
    
})