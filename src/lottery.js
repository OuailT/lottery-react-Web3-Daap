/* Create a copy of lottery contract on the blockchain
   thats going to represent the real contract
*/ 
// we imported web3 to get use of the account and the network
import web3 from "./web3";

/*the address of the contract on the blockchain to know were my contract has been deployed on the network
*/
const address = "0x50a87DB9C4FCfb03DcDDCD884335cabF2d3223fb";

// the Interface of the contract the javascript world
const ABI = [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],
"payable":false,"stateMutability":"nonpayable","type":"constructor"
}];


// Our portal of the contract that exist on the blockchain
export default  new web3.eth.Contract(ABI, address);



