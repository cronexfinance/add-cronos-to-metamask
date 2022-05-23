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
        }).then(() => console.log('Success')).catch((error) => console.log("Error", error.message));
    } else {
        alert('Unable to locate a compatible web3 browser!');
    }
}

function addToWallet(type) {
    var NetID = '25';
    var NetChainID = '0x19';
    var NetName = 'Cronos Mainnet';

    if (type === 'web3') {
        if (typeof ethereum !== 'undefined') {
            eth = new Web3Eth(ethereum);
        } else if (typeof web3 !== 'undefined') {
            eth = new Web3Eth(web3.givenProvider);
        } else {
            eth = new Web3Eth(ethereum);
        }
    }
    var network = 0;
    eth.getChainId((err, netId) => {
        network = netId.toString();
        switch (network) {
            case NetID:
                network = "Cronos Mainnet";
                break;
            default:
                console.log('This is an unknown network.');
        }

        if (network.toLowerCase() !== NetName.toLowerCase()) {
            alert("Please connect to Cronos Chain network");
            return false;
        } else {
            try {
                web3.currentProvider.sendAsync({
                    method: 'wallet_watchAsset',
                    params: {
                        'type': 'ERC20',
                        'options': {
                            'address': '0x5FB33B065Dc1D42192653FfD492235B9dA35Fe59',
                            'symbol': 'CRONEX',
                            'decimals': '18',
                            'image': 'https://github.com/cronexfinance/cronex-token/raw/main/2022-05-15%2020.51.25.jpg',
                        },
                    },
                    id: Math.round(Math.random() * 100000)
                }, function (err, data) {
                    if (!err) {
                        if (data.result) {
                            console.log('Token added');
                        } else {
                            console.log(data);
                            console.log('Some error');
                        }
                    } else {
                        console.log(err.message);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    });
}
