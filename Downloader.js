const puppeteer = require('puppeteer');

async function sleep(ms) {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

class Record {
    constructor() {
        this.url = "";
        this.startTime = "";
        this.endTime = "";
        this.status = 0;
        this.length = 0;
    }
}

class Target {
    constructor() {
        this.recordsInfo = [];
        this.page = {};
        this.flag = true;
    }
}

class Downloader {

    constructor() {
        this.browser = {};
        this.targets = [];
    }

    async init() {
        await this.initBrowser();
        await this.initTargets();
    }

    async initBrowser() {
        this.browser = await this._openBrowser();
    }

    async initTargets() {
        await Promise.all([this.initTarget(),this.initTarget(),this.initTarget()]);
    }

    async getTarget() {
        while (true){
            for(let target of this.targets) {
                if(target.flag){
                    target.flag = false;
                    return target;
                }
            }
            console.info("@@@@ null @@@@");
            await sleep(1000);
        }
    }

    async initTarget() {
        var target = new Target();
        target.page = await this._openTarget();
        this.targets.push(target);
    }

    async _openBrowser() {
        return await puppeteer.launch({args: ['--no-sandbox']});
    }

    async _openTarget() {
        return await this.browser.newPage();
    }
    
    async closeTarget(target) {
        await target.page.close();
    }

    async closeBrowser() {
        await this.browser.close();
    }

    async download(target,url) {
        if (url == "" || url == null) 
            return null;
        let record = new Record();
        record.url = url;
        record.startTime = new Date().getTime();
        var content = "";
        var response = {};
        try {
            response = await target.page.goto(url);
            content = await target.page.content();
            record.status = response.status();
//            let metrics = await target.page.metrics();
//            console.info(metrics);
        } catch (error) {
            content = "";
            console.info("@@@@@",error,"@@@@@");
        }
        record.endTime = new Date().getTime();
        record.length = content.length;
        target.recordsInfo.push(record);
        target.flag = true;
        console.info(record);
        return content;
    }
}

module.exports = Downloader;
