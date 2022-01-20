import React, {useState, useEffect} from "react";
import './App.css';
// to manage the  metamask account
import web3 from './web3';
// to manage the copy of the contract
import lottery from "./lottery";
import Message from "./Message";
import styled from "styled-components";
import gsap from "gsap";
import SplitText from "./Utilis/split3.min";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./components/Wallet/connector";
import FormSend from "./components/Form/FormSend";
import Loading from "./components/Loading/Loading";


//styled components

const AppContainer = styled.div `
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  
`;

const Title = styled.h1`
    font-family: "Bai Jamjuree", sans-serif;
    font-size: ${props => props.primarySize ? "7.5vw" : "5vw"};
    text-align: center;
    letter-spacing: 2px;
    margin-top: 30px;

`;

const Logo = styled.h2`
    font-family: "Bai Jamjuree", sans-serif;
    font-size: 30px;
    text-align: center;
    letter-spacing: 2px;
    cursor: pointer;
`;

const AppContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


const Info = styled.p`
    font-size: 30px;
    text-align: center;
    line-height: 55px;
    letter-spacing: 1px;
    font-weight: 400;
    padding-bottom: 50px;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 640px) {
      font-size: 15px;
      line-height: 38px;
    }

    @media (max-width: 425px) {
      font-size: 12px;
      line-height: 32px;
    }
`;



const WrapperForm = styled.div` 
    max-width: 500px;
    width: 100%;
    padding: 50px;
    border: 20px solid #dce7ff;
    margin-top: ${props => props.marginTop ? "50px" : "0px"};
    margin-bottom : ${props => props.marginBottom ? "50px" : "0px"};

    @media (max-width: 768px) {
        max-width: 300px;
    }

    @media (max-width: 425px) {
      max-width: 200px;
    }
`;

const Content = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (max-width: 768px) {
      max-width: 500px;
    }
`;



const FormTitle = styled.h2`
    font-size: 5vw;
    font-family: "Bai Jamjuree", sans-serif;
    text-align: center;

`;

const Button = styled.button`
    height: ${props => props.hightBtn ? "40px" : "35px"};
    width: ${props => props.widthBtn ? "180px" : "80px"};
    margin-top: ${props => props.marginTOP ? "20px" : "15px"};
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


const Navbar = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;  
`;

const Right = styled.div``;

const Left = styled.div``;



function App() {

  const [manager , setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState({show: false, msg: "", type:""});
  const [ether, setEther] = useState("");


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

  // For Split text Effect
  useEffect(()=> {
    const split = new SplitText("#text-Header", {
        type: "lines",
        linesClass: "LineChildren",
    });

    const splitParent = new SplitText("#text-Header", {
        type: "lines",
        linesClass: "LineParents",
    });

    gsap.to(split.lines, {
        duration: 1.50,
        y: 0,
        opacity: 1,
        stagger:0.1,
        ease:"power2",
    })
},[])




  // Show Message Function 
  const ShowAlert = (show = false, msg = "", type = "") => {
        setMessage({show : show, msg : msg, type: type})
  }


  // Function to Participate to the lottery by sending some Ether
  const submitEther = async (e) => {
      e.preventDefault();
      const account = await web3.eth.getAccounts();

      if(!ether) {
        window.alert("Please enter a value");
      } else {
      ShowAlert(true, " Your transaction is processing...", "success")
      // Call the enter function from our contract
      // we only send to the contract money with wei unit
      await lottery.methods.enter().send({
        from : account[0],
        value: web3.utils.toWei(ether, "ether"),
      });

      ShowAlert(true, " Great , You are a part of the Lottery...", "success")
    }
  };

  // Function to pick a winner
  const winnerHandler = async () => {
    // get the accounts
    const account = await web3.eth.getAccounts();

    // Leave a message to the winner
    ShowAlert(true, "Waiting on transaction success...", "success");

    // Call the pickWinner function from the contract
    await lottery.methods.pickWinner().send({
      from: account[0]
    });

    // Show Message for success 
    ShowAlert(true, "A Winner has been Picked", "Success")

  }

  const { active, account, library, connector, activate, deactivate } = useWeb3React();


  // Connect to metamask
  const Connect = async () => {
    try {
     await activate(injected);
     
    } catch(err) {
      console.log(err)
    }
  }

  return (

    <main>
    <Navbar>
        <Left>
          <Logo>LTR</Logo>
        </Left>
          <Right>
          {active ? <Button widthBtn hightBtn >{account.substring(0,13)}...</Button> :
           <Button widthBtn hightBtn  onClick={Connect}>Connect MetaMask</Button>} 
          </Right>
      </Navbar>

    <AppContainer>
      <Title primarySize id="text-Header">Decentralized Lottery On the Ethereum blockchain</Title>

      <AppContent> 
      

      <Content>
      <Info>
      - The address of the manager of this lottery : "{manager}" <br/>
      - There are currently "{players.length}" players entered <br/>
      - To win {web3.utils.fromWei(balance, "ether")} Ether. <br/>
      </Info>

      <Title>Rules</Title>

      <Info>
      - You should be connected to your Metamask Wallet on the rinkeby network <br/>
      - The minimum amount to send is 0.01 Ether  <br/>
      - The winner will be displayed on the website in 10 days <br/>
      - Good Luck
      </Info>

      

      </Content>
      
      <WrapperForm>
       <FormSend submitEther={submitEther} ether={ether} setEther={setEther}/> 
      </WrapperForm>
      {message.show && <Message {...message} removeAlert={ShowAlert}/>}
      {message.show && <Loading/>}

      <WrapperForm marginTop marginBottom>
      <WinnerContainer>
        <FormTitle>Pick a winner !</FormTitle>
        <Button widthBtn onClick={winnerHandler}>Pick a winner</Button>
      </WinnerContainer>
      </WrapperForm>
      
      </AppContent>
    </AppContainer>
    </main>
  );
}

export default App;





