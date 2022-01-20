import React, {useEffect } from "react";
import styled from "styled-components";



const MsgShow = styled.h2 `
    font-size : 18px;
    letter-spacing: 1px;
    font-family: "Bai Jamjuree", sans-serif;
`;  


const Message = ({msg, removeAlert}) => {

    useEffect(()=> {
        const timeOut = setTimeout(() => {
            removeAlert();
        }, 20000);

        return ()=> clearTimeout(timeOut);

    },[])


    return (
        <MsgShow>
            <h1>{msg}</h1>
        </MsgShow>
    )
}


export default Message;


