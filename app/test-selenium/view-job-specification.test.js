require('chromedriver');
const assert = require('assert');
const { json } = require('express');
const {Builder, Key, By, until} = require('selenium-webdriver');
 
const url = 'http://localhost:7999/viewjobspecification/1'
const url_jobroles = 'http://localhost:7999/viewjobroles'

describe('Checkout View Job Specificaton', function () {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);
    });

    it('Check job name exists', async function() {
        let job_name = await driver.findElement(By.id("job_name"));
        assert.equal(true, job_name != null);              
    });

    it('Check band level exists', async function() {
        let job_band = await driver.findElement(By.id("job_band_level"));
        assert.equal(true, job_band != null); 
    });             
    
    it('Check capability exists', async function() {
        let job_capability = await driver.findElement(By.id("job_capability"));
        assert.equal(true, job_capability != null);              
    });

    it('Check contract type exists and contains the expected text', async function() {
        let contract_type = await driver.findElement(By.id("contract_type")).getText();
        assert.equal(true, contract_type.includes("Full Time") || contract_type.includes("Part Time") || contract_type.includes("Consultant"));              
    });

    it('Check locations exists and contains the expected text', async function() {
        let locations = await driver.findElement(By.className("locations")).getText();
        assert.equal(true, locations.includes('Belfast') || locations.includes('Birmingham') || locations.includes('Gdansk') || locations.includes('London'));              
    });

    it('Check job description exists', async function() {
        let job_description = await driver.findElement(By.id("job_description"));
        assert.equal(true, job_description != null);              
    });

    it('Check job sharepoint link exists', async function() {
        let job_job_sharePointLink = await driver.findElement(By.id("job_sharePointLink"));
        assert.equal(true, job_job_sharePointLink != null);              
    });

    it('Check job responsiblities exists', async function() {
        let job_responsibilities= await driver.findElement(By.id("job_responsibilities"));
        assert.equal(true, job_responsibilities != null);              
    });

    after(() => driver && driver.quit());
    
})

describe('Checkout View Job Specificaton with Job Roles', function () {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url_jobroles);
    });

    it('Check link from job roles to job spec', async function() {
        await driver.findElement(By.linkText("Head of test job")).click()
        let job_description = await driver.findElement(By.id("job_description"));
        assert.equal(true, job_description != null);              
    });

    after(() => driver && driver.quit());
    
})