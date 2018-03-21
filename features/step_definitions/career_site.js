'use strict';

const careerSite = require('../ui/page_objects/career_site');

module.exports = function () {

    this.Given(/^the (.+) site is loaded$/, (page) => {
        return careerSite.openPage(page);
    });

    this.When(/^the (.+) is clicked$/, (target) => {
        return careerSite.clickElement(target);
    });

    this.When(/^the role (.*) is entered$/, role => {
        return careerSite.enterRole(role);
    });

    this.When(/^the country (.+) is selected$/, country => {
        return careerSite.selectCountry(country);
    });

    this.When(/^the city (.*) is selected$/, city => {
        return careerSite.selectCity(city);
    });

    this.Then(/^the available jobs are (displayed|hidden)$/, (state) => {
        return expect(driver.findElement(by.css('.search-result')).isDisplayed()).to.eventually.be.equal(state === 'displayed');
    });

    this.Then(/^an open position should be (displayed|hidden)$/, state => {
        return expect(driver.findElement(by.css('.search-result__item-info')).isDisplayed()).to.eventually.be.equal(state === 'displayed');
    });

    this.Then(/^the title of the position should be (.*)$/, role => {
        return expect(driver.findElement(by.css('.search-result__item-name')).getText()).to.eventually.equal(role);
    });

    this.Then(/^the location of the position should be (.*)$/, location => {
        return expect(driver.findElement(by.css('.search-result__location')).getText()).to.eventually.equal(location);
    });

    this.Then(/^the priority of the position should be (.*)$/, priority => {
        return expect(driver.findElement(by.css('.search-result__item-type')).getText()).to.eventually.equal(priority);
    });

    this.Then(/^the description of the position should start with: (.*)$/, desc => {
        return driver.findElement(by.css('.search-result__item-description')).getText().then(text => expect(text.startsWith(desc)).to.be.equal(true));
    });

    this.Then(/^And the following skills are selected: Software Engineering, Software Test Engineering$/, (data) => {
        let skills = data.split(',');

    });

    this.Then(/^the following positions should be displayed:$/, (dataTable) => {
        let dataArray = dataTable.raw().map(subarr => subarr[index]);
        const positionByName = () => driver.findElement(by.cssContaingText(text));
        return expect(dataArray.map(item => positionByName(item).isDisplayed()).every(Boolean)).to.eventually.equal(true);
    });

    this.Given(/^the (.*) is awaited to load$/, function (target) {
        return careerSite.waitForElementLoad(target)
    });
};