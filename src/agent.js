const { Finding, FindingSeverity, FindingType } = require('forta-agent');

// load config file
const addressList = require('./address-watch.json');

// load configuration data from agent config file
const { aaveEverestId: AAVE_EVEREST_ID } = require('../agent-config.json');

// get list of addresses to watch
const addresses = Object.keys(addressList);

async function handleTransaction(txEvent) {
  const findings = [];
  const txAddresses = Object.keys(txEvent.addresses);

  // check if an address in the watchlist was the initiator of the transaction
  addresses.forEach((address) => {
    console.log(address, txAddresses);
    if (txAddresses.includes(address.toLowerCase())) {
      findings.push(
        Finding.fromObject({
          name: 'ENS Address Watch',
          description: `Address ${address} (${addressList[address]}) was involved in a transaction`,
          alertId: 'ENS-ADDRESS-WATCH',
          type: FindingType.Suspicious,
          severity: FindingSeverity.Low,
          everestId: AAVE_EVEREST_ID,
        }),
      );
    }
  });

  return findings;
}

module.exports = {
  handleTransaction,
  addressList,
};
