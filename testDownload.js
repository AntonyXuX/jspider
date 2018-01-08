const Downloader = require('./Downloader');

downloader = new Downloader();
downloader.init().then(() => {
    var page = downloader.getPage();
    console.info(page);
    downloader.download(page,"http://www.baidu.com").then(content => {console.info(content.length)})
});
