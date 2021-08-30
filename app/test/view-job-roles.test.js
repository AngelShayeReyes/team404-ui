require('chromedriver');
const assert = require('assert');
const { json } = require('express');
const {Builder, Key, By, until} = require('selenium-webdriver');
const script = require('jest');
 
const url = 'http://localhost:7999/viewjobroles'

describe('Checkout View Job Roles', function () {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);
    });

    it('Check webpage is up, running and showing the correct view', async function() {
        let page_header = await driver.findElement(By.id("page_title")).getText(); 	
        console.log(JSON.stringify(page_header));
        assert.equal(page_header, 'View Job Roles');              
    });

    it('Check Title from API is being displayed and entered correctly within the table', async function(){ 
        let innerText = await driver.findElement(By.xpath("//table/tbody/tr[2]/td[1]")).getText(); 	
        assert.equal(innerText, 'Head of People Operations');  
 
    });

    it('Check Contract Type from API is being displayed and entered correctly within the table', async function(){ 
        let innerText = await driver.findElement(By.xpath("//table/tbody/tr[1]/td[2]")).getText(); 	
        assert.equal(innerText, 'Full time');  
 
    });


    after(() => driver && driver.quit());
    
})

