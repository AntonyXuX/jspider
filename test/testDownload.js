const Downloader = require('../Downloader');

(async () => {
    console.info(new Date().getTime());
    downloader = new Downloader();
    await downloader.init();
    console.info(new Date().getTime());

    var urls = [
                  "https://baike.baidu.com/ziran",
                  "https://baike.baidu.com/wenhua",
                  "https://baike.baidu.com/art",
                  "https://baike.baidu.com/dili",
                  "https://baike.baidu.com/shehui",
                  "https://baike.baidu.com/jingji",
                  "https://baike.baidu.com/lishi",
                  "https://baike.baidu.com/science",
                  "https://baike.baidu.com/shenghuo",
                  "https://baike.baidu.com/renwu"
               ];
    for(url of urls) {
        console.info(url);
        var page = await downloader.getTarget();
        downloader.download(page,url);
    }
})();

    //    let content = await downloader.download(page,"https://www.toutiao.com/ch/news_hot");
    //    downloader.download(page,"http://www.skdfjls.com/123").then(content => {console.info(content.length)})
