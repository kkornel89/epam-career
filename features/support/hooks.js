'use strict';

require('chromedriver');
require('cucumber').Util.Colors(true);
var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
global.expect = chai.expect;

var webdriver = require('selenium-webdriver');
global.by = webdriver.By;

module.exports = function(){
    this.setDefaultTimeout(60000);
    this.registerHandler('BeforeFeatures', function(){

        global.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
        global.driver.isElementVisible = function(locator){
            return driver.isElementPresent(locator).then(function (present) {
                if (!present) {
                    return false;
                }
                return driver.findElement(locator).isDisplayed().then(null, function () {
                    return false;
                });
            });
        };
        return global.driver.executeScript(function() {
            return {
                posx: window.screen.availWidth,
                posy: window.screen.availHeight
            };
        }).then(function(result) {
            // global.driver.manage().window().setPosition(-1*result.posx, 0);
            global.driver.manage().window().maximize();
        });
    });

    this.registerHandler('AfterFeatures', function(){
        return global.driver.quit();
    });
};