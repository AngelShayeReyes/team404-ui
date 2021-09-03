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
        let innerText = await driver.findElement(By.xpath("//table/tbody/tr[2]/td[3]")).getText(); 	
        assert.equal(innerText, 'Full time');  
    });

    it('Check Location from API is being displayed and entered correctly within the table', async function(){ 
        let innerText = await driver.findElement(By.xpath("//table/tbody/tr[1]/td[2]")).getText(); 	
        assert.equal(innerText, 'London , More...');  
    });

    after(() => driver && driver.quit());
    
})

describe('Checkout Filtering in Job Roles', function () {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);
    });

    it('Check "Technical Architect" is being shown as no filters are checked', async function(){ 
        let innerText = await driver.findElement(By.xpath('/html/body/table/tbody/tr[3]')).getCssValue("display");
        assert.equal(innerText, 'table-row'); 
    });

    it('Check "Technical Architect" is not being shown if "London" filter is checked', async function(){ 
        await driver.findElement(By.xpath('//*[@id="chkbox-London"]')).click()
        let innerText = await driver.findElement(By.xpath('/html/body/table/tbody/tr[3]')).getCssValue("display");
        assert.equal(innerText, 'none'); 
    });

    it('Check "Product Owner" is not being shown if "London and Engineering" filter is checked', async function(){ 
        await driver.findElement(By.xpath('//*[@id="chkbox-Engineering"]')).click()
        let innerText = await driver.findElement(By.xpath('/html/body/table/tbody/tr[5]')).getCssValue("display");
        assert.equal(innerText, 'none'); 
    });

    it('Check "Test Engineer" is not being shown if "London, Engineer and Senior Associate" filter is checked', async function(){ 
        await driver.findElement(By.xpath('//*[@id="chkbox-Senior_Associate"]')).click()
        let innerText = await driver.findElement(By.xpath('/html/body/table/tbody/tr[5]')).getCssValue("display");
        assert.equal(innerText, 'none'); 
    });

    it('Check "Senior Software Engineer (Java)" is being shown if "London, Engineer and Senior Associate" filter is checked', async function(){ 
        let innerText = await driver.findElement(By.xpath('/html/body/table/tbody/tr[6]')).getCssValue("display");
        assert.equal(innerText, 'table-row');
    });

    it('Unheck all filters and check if "Head of test job" is being shown', async function(){ 
        await driver.findElement(By.xpath('//*[@id="chkbox-London"]')).click()
        await driver.findElement(By.xpath('//*[@id="chkbox-Engineering"]')).click()
        await driver.findElement(By.xpath('//*[@id="chkbox-Senior_Associate"]')).click()
        let innerText = await driver.findElement(By.xpath('/html/body/table/tbody/tr[1]')).getCssValue("display");
        assert.equal(innerText, 'table-row');
    });

    it('Check "Technical Architect" is being shown if "Toronto" filter is checked', async function(){ 
        await driver.findElement(By.xpath('//*[@id="chkbox-Toronto"]')).click()
        let innerText = await driver.findElement(By.xpath('/html/body/table/tbody/tr[3]')).getCssValue("display");
        assert.equal(innerText, 'table-row'); 
    });

    it('Check "Product Owner" is being shown if "Business development and marketing" filter is checked', async function(){ 
        await driver.findElement(By.xpath('//*[@id="chkbox-Toronto"]')).click()
        await driver.findElement(By.xpath('//*[@id="chkbox-Business_Development_and_Marketing"]')).click()
        let innerText = await driver.findElement(By.xpath('/html/body/table/tbody/tr[5]')).getCssValue("display");
        assert.equal(innerText, 'table-row'); 
    });

    it('Check "Head of People Operations" is being shown if "Leadership" filter is checked', async function(){ 
        await driver.findElement(By.xpath('//*[@id="chkbox-Business_Development_and_Marketing"]')).click()
        await driver.findElement(By.xpath('//*[@id="chkbox-Leadership"]')).click()
        let innerText = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]')).getCssValue("display");
        assert.equal(innerText, 'table-row'); 
    });

    after(() => driver && driver.quit());
    
})
