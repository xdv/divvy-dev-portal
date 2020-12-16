'use strict'
const DivvyAPI = require('divvy-lib').DivvyAPI

const myAddr = 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn'
const mySecret = 's████████████████████████████'

const myEscrowCancellation = {
  owner: myAddr,
  escrowSequence: 366
}
const myInstructions = {
  maxLedgerVersionOffset: 5
}

const api = new DivvyAPI({server: 'wss://s2.xdv.io'})

function submitTransaction(lastClosedLedgerVersion, prepared, secret) {
  const signedData = api.sign(prepared.txJSON, secret)
  console.log('Transaction ID: ', signedData.id)
  return api.submit(signedData.signedTransaction).then(data => {
    console.log('Tentative Result: ', data.resultCode)
    console.log('Tentative Message: ', data.resultMessage)
  })
}

api.connect().then(() => {
  console.log('Connected')
  return api.prepareEscrowCancellation(myAddr, myEscrowCancellation, myInstructions)
}).then(prepared => {
  console.log('EscrowCancellation Prepared')
  return api.getLedger().then(ledger => {
    console.log('Current Ledger', ledger.ledgerVersion)
    return submitTransaction(ledger.ledgerVersion, prepared, mySecret)
  })
}).then(() => {
  api.disconnect().then(() => {
    console.log('api disconnected')
    process.exit()
  })
}).catch(console.error)
