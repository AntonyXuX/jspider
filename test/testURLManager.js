const URLManager = require('./URLManager');

manager = new URLManager();
manager.add_new_url("123");
manager.add_new_url("234");
console.info(manager._new_urls);


