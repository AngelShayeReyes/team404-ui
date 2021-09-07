require('chromedriver');
const assert = require('assert');
const { json } = require('express');
const {Builder, Key, By, until} = require('selenium-webdriver');
const script = require('jest');
 
const url = 'http://localhost:7999/viewmatrixofroles'

describe('Checkout View Matrix of Roles', function () {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);
    });

    it('Check webpage is up, running and showing the correct view', async function() {
        let page_header = await driver.findElement(By.id("page_title")).getText(); 	
        console.log(JSON.stringify(page_header));
        assert.equal(page_header, 'Engineering Capability');              
    });

    it('Check table exists', async function() {
        let table = await driver.findElement(By.id("us007-table"));
        assert.equal(true, table != null);              
    });
    
    it('Check Job Family from API is being displayed and entered correctly within the table', async function(){ 
        let innerText = await driver.findElement(By.xpath("//*[@id=\"us007-table\"]/thead/tr/th[1]")).getText(); 	
        assert.equal(innerText, 'Engineering Strategy and Planning');  
    });

    it('Check Band Level from API is being displayed and entered correctly within the table', async function(){ 
        let innerText = await driver.findElement(By.xpath("//*[@id=\"us007-table\"]/tbody/tr[1]/th")).getText(); 	
        assert.equal(innerText, 'Executive');  
 
    });

    it('Check Data from API is being displayed and entered correctly within the table', async function(){ 
        let innerText = await driver.findElement(By.xpath("//*[@id=\"us007-table\"]/tbody/tr[1]/td[1]")).getText(); 	
        assert.equal(innerText, '');  
 
    });

    after(() => driver && driver.quit());
    
})

