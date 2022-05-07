// ADD Binance Smart Chain to Metamask
var eth;
var isTestnet = 'false';

async function addNetwork(type) {

    if (type === 'web3') {
        if (typeof ethereum !== 'undefined') {
            eth = new Web3Eth(ethereum);
        } else if (typeof web3 !== 'undefined') {
            eth = new Web3Eth(web3.givenProvider);
        } else {
            eth = new Web3Eth(ethereum);
        }
    }
    if (typeof eth !== 'undefined') {
        var network = 0;
        network = await eth.net.getId();
        netID = network.toString();
        var params;
        if (isTestnet == "false") {
            if (netID == "25") {
                alert("CRONOS Network has already been added to Metamask.");
                return;
            } else {
                params = [{
                    chainId: '0x19',
                    chainName: 'CRONOS Mainnet',
                    nativeCurrency: {
                        name: 'CRO',
                        symbol: 'CRO',
                        decimals: 18
                    },
                    rpcUrls: ['https://evm.cronos.org'],
                    blockExplorerUrls: ['https://cronoscan.com']
                }]
            }
        } 
        window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params
        }).then(()=>console.log('Success')).catch((error)=>console.log("Error", error.message));
    } else {
        alert('Unable to locate a compatible web3 browser!');
    }
}
