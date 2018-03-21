'use strict';

const careerSite = require('../selectors/career_site');

class CareerSite {
    openPage(page) {
        const url = global.urls[page];

        return driver.get(url);
    }

    enterRole(role){
        return this.getElement("Role input").sendKeys(role);
    }

    selectCountry(country){
        this.clickElement("Location Arrow");
        driver.sleep(500);
        let locationItem = driver.findElement(by.xpath(`//span[@class="job-search__location"]//*[@class="option"]/*[@class="optgroup" and text()="${country}"]`));
        locationItem.click();
        return driver.sleep(500);
    }

    selectCity(city){
        driver.sleep(500);
        let cityID = `//*[@class="select-box-results"]//*[contains(@id,"${city}")]`;
        return driver.findElement(by.xpath(cityID)).click();
    }

    waitForElementLoad(target) {
        return driver.wait(() => this.getElement(target).isDisplayed());
    }

    clickElement(target) {
        return this.getElement(target).click();
    }

    getElement(target){
        return driver.findElement(by.css(this.getSelector(target)))
    }

    getSelector(target) {
        return careerSite[target];
    }
}

module.exports = new CareerSite();
