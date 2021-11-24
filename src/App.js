import React, {useState, useEffect} from "react";
import './App.css';
// to manage the  metamask account
import web3 from './web3';
// to manage the copy of the contract
import lottery from "./lottery";
import Message from "./Message";

function App() {
  web3.eth.getAccounts().then(console.log)

  const [manager , setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [ether, setEther] = useState("");
  const [message, setMessage] = useState({show: false, msg: "", type:""});

  useEffect(()=> {
    const fetch = async () => {
        const managerResult = await lottery.methods.manager().call();
        const playersResult = await lottery.methods.getPlayers().call();
        /* getBalance methods to get the current balance +
         the address of the account to it. */
        const balanceResult = await web3.eth.getBalance(lottery.options.address);
        setBalance(balanceResult);
        setPlayers(playersResult);
        setManager(managerResult);
    }
    fetch();

  },[]);

  // Show Message Function 
  const ShowMessage = (show = false, msg = "", type = "") => {
        setMessage({show : show, msg : msg, type: type})
  }


  // Function to Participate to the lottery by sending some Ether
  const submitEther = async (e) => {
      e.preventDefault();

      // Get Accounts 
      const account = await web3.eth.getAccounts();
      ShowMessage(true, " Your transaction is processing...", "success")
      // Call the enter function from our contract
      // we only send to the contract money with wei unit
      await lottery.methods.enter().send({
        from : account[0],
        value: web3.utils.toWei(ether, "ether"),
      });

      ShowMessage(true, " Great , You are a part of the Lottery...", "success")
  };

  // Function to pick a winner
  const winnerHandler = async () => {
    // get the accounts
    const account = await web3.eth.getAccounts();

    // Leave a message to the winner
    ShowMessage(true, "Waiting on transaction success...", "success");

    // Call the pickWinner function from the contract
    await lottery.methods.pickWinner().send({
      from: account[0]
    });

    // Show Message for success 
    ShowMessage(true, "A Winner has been Picked", "Success")

  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <h2>This contract is manager by {manager}, There are currently {players.length} players entered, to win {web3.utils.fromWei(balance, "ether")} Ether</h2>

      <form onSubmit={submitEther} >
        <h3>Try your luck buddy !</h3>
          <div className="form-control">
            <label> Enter Ether</label>
            <input
            className="ether-input"
            value={ether}
            onChange={(e)=> setEther(e.target.value)}
            />
          </div>
          <button type="submit">Send it </button>
      </form>
      {message.show &&  <Message {...message}/>}

      <div className="winner">
        <h2>Pick a winner !</h2>
        <button onClick={winnerHandler}>Pick a winner</button>
      </div>

    </div>
  );
}

export default App;




// class components 
// class app extends component {

//   constructor(props) {
//     super(props);
//     this.state = {manager : ""}, 
//     this.state = {players : []},
//     this.state= { balance : ""}
//   }

//   async componentDidMount() {
//     const manager = await lottery.methods.manager().call();
//     const players = await lottery.methods.players().call();
//     const balance = await web3.eth.getBalance(lottery.options.address);
//     this.setState = {{manager : manager,
//                        players : players,
//                         balance : balance}};
//   }

//   render() {
//     return (
//       <h1>Hello world</h1>
//       <p> The lottery is managed by {this.state.manager} 
//           there are {this.state.players.length} participating for now, the balance of the lottery is {web3.eth.fromWei(this.state.balance, "ether")}
      
//     </p>
//     )
//   }
// }



