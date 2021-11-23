import React, {useState, useEffect} from "react";
import './App.css';
// to manage the account
import web3 from './web3';
// to manage the copy of the contract
import lottery from "./lottery";

function App() {
  web3.eth.getAccounts().then(console.log)

  const [manager , setManager] = useState("");

  useEffect(()=> {
    const fetchManager = async () => {
        const managerResult = await lottery.methods.manager().call();
        setManager(managerResult);
    }
    fetchManager();

  },[])

  return (
    <div className="App">
      <h1>Hello</h1>
      <h2>The address of the manager is {manager}</h2>
    </div>
  );
}

export default App;
