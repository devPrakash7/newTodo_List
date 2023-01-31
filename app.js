
const moment = require("moment");

let secs = "1675138628"

let a = moment.utc(secs * 1000).format();
console.log(typeof a)