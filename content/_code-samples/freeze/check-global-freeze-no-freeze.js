const {DivvyAPI} = require('divvy-lib');

const api = new DivvyAPI({
  server: 'wss://s1.xdv.io' // Public divvyd server
});
api.on('error', (errorCode, errorMessage) => {
  console.log(errorCode + ': ' + errorMessage);
});

const my_address = 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn';

api.connect().then(() => {
  // Look up settings object
  return api.getSettings(my_address);
}).then(settings => {
  console.log('Got settings for address', my_address);
  console.log('Global Freeze enabled?',
              (settings.globalFreeze === true));
  console.log('No Freeze enabled?', (settings.noFreeze === true));

}).then(() => {
  return api.disconnect();
}).catch(console.error);
