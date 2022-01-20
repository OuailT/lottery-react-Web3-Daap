// Web 3 is constructor function
import Web3 from "web3";

/* connect web3 get the instance of metaMask provider to get
    the private key and public key
    and get connected to the rinkeby network
*/

let web3;

if (window.ethereum && window.ethereum.isMetaMask) {
    console.log('MetaMask Here!');
    web3 = new Web3(window.ethereum);

    window.ethereum.request({ method: 'eth_requestAccounts'})
    
} else {
    console.log('Need to install MetaMask');
    window.Error('Please install MetaMask browser extension to interact with this Dapp');
}

export default web3;



