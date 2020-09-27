/**
 * Test for getting started with Selenium.
 */
"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

const firefox = require('selenium-webdriver/firefox');

let browser;

// Test suite
test.describe("me-app", function() {

    this.timeout(20000);

    test.beforeEach(function(done) {
        this.timeout(20000);

        const screen = { width: 1920, height: 1080 };

        browser = new webdriver.Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
            .build();

        browser.get("http://localhost:8080");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });


    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertH1(target) {
        browser
        .findElement(By.css("h1"))
        .then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    // Test case
    test.it("Test index", function(done) {

        browser.getTitle().then(function(title) {
            assert.equal(title, "me-app");
            done();
        }).catch(done);

        // matchUrl("/#/");
        //
        // browser.findElement(By.className("me-img"));

        done();
    });

    // test.it("Test go to Redovisning", function(done) {
    //     goToNavLink("Redovisning");
    //
    //     matchUrl("/#/reports");
    //
    //     browser.findElement(By.className("reports-nav"))
    //     .findElement(By.css("ul"))
    //     .findElements(By.css("li"))
    //     .then(function(elements) {
    //         elements[0].getText()
    //         .then(function(text) {
    //             assert.equal(text, "kmom01")
    //         });
    //
    //         elements[0].findElement(By.css("a"))
    //         .then(function(link) {
    //             link.getAttribute("class")
    //             .then(function(value) {
    //                 assert.equal(value, "active")
    //             })
    //         })
    //     });
    //
    //     done();
    // });
    //
    // test.it("Test error messages in register form", function(done) {
    //     goToNavLink("Registrera");
    //
    //     matchUrl("/#/register");
    //
    //     browser.findElement(By.name("register")).click();
    //     browser.findElement(By.id("error-message"))
    //     .findElements(By.className("error"))
    //     .then((function(errorEls) {
    //         errorEls[0].getText().then(function(text) {
    //             assert.equal(text, "Fyll i en giltig e-post.");
    //         })
    //     }));
    //     done();
    // });

    // // Try to log in.
    // // TODO: A better solution would be to mock a database
    // // for testing so as not to affect the production db.
    // test.it("Test log in", function(done) {
    //     goToNavLink("Logga in");
    //
    //     matchUrl("/#/login");
    //
    //     let email = browser.findElement(By.id("email"));
    //     let password = browser.findElement(By.id("password"));
    //     let loginButton = browser.findElement(By.id("login"));
    //
    //     email.sendKeys("mumin@skogen.fi");
    //     password.sendKeys("mumin");
    //
    //     loginButton.click()
    //     .then(async function() {
    //
    //         browser.wait(function() {
    //             return browser.findElement(By.id("status-bar"))
    //             .getText().then(function(text) {
    //                 return text === "Inloggad som mumin@skogen.fi";
    //             })
    //         }, 5000).then(function() {
    //             done();
    //         })
    //     });
    //     done();
    // });
});
