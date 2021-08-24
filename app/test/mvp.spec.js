require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');

describe('Checkout MVP', function () {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('Format Info on MVP', async function() {
        await driver.get('http://localhost:7999/mvp');
        let title = await driver.getTitle();
        assert.equal(title, 'MVP| Home');              
    });

    after(() => driver && driver.quit());
})