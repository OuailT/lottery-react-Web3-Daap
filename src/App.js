import React, {useState, useEffect} from "react";
import './App.css';
// to manage the  metamask account
import web3 from './web3';
// to manage the copy of the contract
import lottery from "./lottery";
import Message from "./Message";
import styled from "styled-components";


//styled components

const AppContainer = styled.div `
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  
`;

const Title = styled.h1`
    font-family: "Bai Jamjuree", sans-serif;
    font-size: ${props => props.primarySize ? "8vw" : "5vw"};
    text-align: center;
    letter-spacing: 2px;

`;

const AppContent = styled.div`
  padding-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

`;


const Info = styled.p`
    font-size: 30px;
    max-width: 900px;
    text-align: center;
    line-height: 50px;
    letter-spacing: 1px;
    font-weight: 400;
    padding-bottom: 50px;
`;

const Span = styled.span`
    font-size: 25px;
    font-weight: 700;
`;

const Wrapper = styled.div` 
    max-width: 500px;
    width: 100%;
    padding: 50px;
    border: 20px solid #dce7ff;
    margin-top: ${props => props.marginTop ? "50px" : "0px"};
    
`;

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  
`;

const FromControl = styled.div`
    width: 100%;
    margin: 0px 0px 30px 0px;
`;


const Input = styled.input`
    width: 100%;
    padding: 8px;
    font-weight: 400;
    color: #000;
    font-family: inherit;
    border: 2px solid teal;
    letter-spacing: 1px;
    font-size: 15px;
    font-weight: 600;
`;

const Button = styled.button`
    height: 37px;
    width: ${props => props.widthBtn ? "136px" : "80px"};
    margin-top: 15px;
    background-color: #fff;
    border: none;
    color: #000;
    font-family: inherit;
    letter-spacing: 1px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.5s ease-in-out;
    font-weight: 700;

    &:hover {
      background-color: #dce7ff;
      letter-spacing: 2px;
    }

`;

const WinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`;

const FormTitle = styled.h2`
    font-size: 5vw;
    font-family: "Bai Jamjuree", sans-serif;
    text-align: center;

`;



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
    <AppContainer>
      <Title primarySize>Decentralized Lottery On the Ethereum blockchain</Title>

      <AppContent> 

      <Info>The address of the manager of this lottery : "<Span>{manager}</Span>" <br/> There are currently "<Span>{players.length}</Span>" players entered, to win "<Span>{web3.utils.fromWei(balance, "ether")}</Span>" Ether. <br/></Info>

      <Title>Rules</Title>

      <Info>
      - You should be connected to your Metamask Wallet <br/>
      - The minimum amount to send is 0.01 Ether <br/>
      - The winner will be displayed on the website in 10 days <br/>
      - Good Luck 
      </Info>
      
      <Wrapper>
        <Form onSubmit={submitEther} >
            <FromControl className="form-control">
              <FormTitle> Enter Ether</FormTitle>
              <Input
              className="ether-input"
              value={ether}
              onChange={(e)=> setEther(e.target.value)}
              />
            </FromControl>
            <Button type="submit">Send it </Button>
        </Form>
      </Wrapper>
      {message.show &&  <Message {...message}/>}

      <Wrapper marginTop>
      <WinnerContainer>
        <FormTitle>Pick a winner !</FormTitle>
        <Button widthBtn onClick={winnerHandler}>Pick a winner</Button>
      </WinnerContainer>
      </Wrapper>
      </AppContent>
    </AppContainer>
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



