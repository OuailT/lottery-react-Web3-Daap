import React,{useState} from 'react';
import web3 from '../../web3';
import styled from "styled-components";



const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  
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

const FormTitle = styled.h2`
    font-size: 5vw;
    font-family: "Bai Jamjuree", sans-serif;
    text-align: center;

`;



const FormSend = ({submitEther, ether, setEther}) => {


    return (
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
       
    );
}

export default FormSend
