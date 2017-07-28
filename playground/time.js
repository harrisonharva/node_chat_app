var moment = require('moment');
var date = moment();

console.log(date.format('hh:mm a'));
console.log(date.format('h:mm a'));


// // Jan 1st 1970 00:00:10 am
console.log(date.format('MMM Do, YYYY HH:mm:ss a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var date = moment(someTimestamp);
console.log(date.format('MMM Do, YYYY h:mm:ss a'));

// console.log(date.add(1, 'year'));
