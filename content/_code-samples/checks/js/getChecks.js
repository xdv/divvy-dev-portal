'use strict'
const DivvyAPI = require('divvy-lib').DivvyAPI

// This example connects to a public Test Net server
const api = new DivvyAPI({server: 'wss://s.altnet.divvytest.net:51233'})
api.connect().then(() => {
  console.log('Connected')

  const account_objects_request = {
    command: "account_objects",
    account: "rBXsgNkPcDN2runsvWmwxk3Lh97zdgo9za",
    ledger_index: "validated",
    type: "check"
  }

  return api.connection.request(account_objects_request)
}).then(response => {
  console.log("account_objects response:", response)

// Disconnect and return
}).then(() => {
  api.disconnect().then(() => {
    console.log('Disconnected')
    process.exit()
  })
}).catch(console.error)
