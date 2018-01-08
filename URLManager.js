const Queue = require("queue");

class UrlManager {
    constructor() {
        this._new_urls = new Queue();
        this._old_urls = new Queue();
    }

    _new_url_size() {
        return this._new_urls.length
    }

    _old_url_size() {
        return this._old_urls.length
    }

    get_new_url() {
        const new_url = this._new_urls.pop()
        this.old_urls.push(new_url)
        return new_url
    }

    add_new_url(url) {
        if (url == "")
            return
        if ( this._new_urls.indexOf(url) == -1 && this._old_urls.indexOf(url) == -1){
            this._new_urls.push(url)
        }
    }

    add_new_urls(urls) {
        if (urls.length == 0)
            return
        urls.forEach(function(url) {
            if ( this._new_urls.indexOf(url) != -1 && this._old_urls.indexOf(url) != -1){
                this._new_urls.push(url)
            }
        });
    }

    print_urls() {
        console.info(this._old_urls.pop());
        console.info(this._new_urls.pop());
    }
}

module.exports = UrlManager;
