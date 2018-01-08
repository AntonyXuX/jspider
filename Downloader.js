const puppeteer = require('puppeteer');

class Url {
    constructor() {
        this.url = "";
        this.startTime = "";
        this.endTime = "";
        this.flag = false;
    }
}

class Page {
    constructor() {
        this.urlsDownloadInfo = [];
        this.page = {};
        this.flag = true;
    }
}

class Downloader {

    constructor() {
        this.browser = {};
        this.pages = [];
    }

    async init() {
        await this.initBrowser();
        await this.initPages();
    }

    async initBrowser() {
        this.browser = await this._openBrowser();
    }

    async initPages() {
        await Promise.all([this.initPage(),this.initPage(),this.initPage()]);
    }

    getPage() {
        for(let page of this.pages) {
            if(page.flag){
                return page;
            }
        }
        return null;
    }

    async initPage() {
        var page = new Page();
        page.page = await this._openPage();
        this.pages.push(page);
    }

    async _openBrowser() {
        return await puppeteer.launch({args: ['--no-sandbox']});
    }

    async _openPage() {
        return await this.browser.newPage();
    }
    
    async closePage(page) {
        await page.close();
    }

    async closeBrowser() {
        await this.browser.close();
    }

    async download(page,url) {
        if (url == "" || url == null) 
            return null;
        await page.page.goto(url);
        var content = await page.page.content();
        return content;
    }
}

module.exports = Downloader;
