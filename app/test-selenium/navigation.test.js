require('chromedriver');
const assert = require('assert');
const { json } = require('express');
const {Builder, Key, By, until} = require('selenium-webdriver');
const script = require('jest');
 
const url = 'http://localhost:7999/navigation'

describe('Checkout Navigation Page', function () {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);
    });

    it('Check webpage is up, running and showing the correct view', async function() {
        let page_header = await driver.findElement(By.id("page_title")).getText(); 	
        assert.equal(page_header, 'Kainos Job Application');              
    });

    it('Check link from navigation to job roles', async function() {
        await driver.findElement(By.id("Job Roles Link")).click()        
        let page_header = await driver.findElement(By.id("page_title")).getText(); 	
        assert.equal(page_header, 'View Job Roles');           
    });

    it('Check link from navigation to competencies for engineering capability', async function() {
        await driver.navigate().back();
        await driver.findElement(By.id("Competencies for the Engineering Capability Link")).click()
        let page_header = await driver.findElement(By.id("page_title")).getText(); 	
        assert.equal(page_header, 'Kainos Competencies for the Engineering Capability');               
    });


    it('Check link from navigation to matrix of roles', async function() {
        await driver.navigate().back();
        await driver.findElement(By.id("Matrix of Roles Link")).click()
        let page_header = await driver.findElement(By.id("page_title")).getText(); 	
        assert.equal(page_header, 'Engineering Capability');            
    });

    it('Check link bannar links to homepage', async function() {
        await driver.findElement(By.id("Homepage Link")).click()
        let page_header = await driver.findElement(By.id("page_title")).getText(); 	
        assert.equal(page_header, 'Kainos Job Application'); 
    });

    after(() => driver && driver.quit());
    
})

