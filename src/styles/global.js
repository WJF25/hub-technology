import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
    margin:0;
    padding:0;
    box-sizing: border-box;
    outline:0;
    font-family: "Mukta", monospace;
    }
    :root{
        --white: #f5f5f5;
        --vanilla: #f1ede0;
        --black: #0c0d0d;
        --orange: #c85311;
    }

    body{
        background: var(--vanilla);
        color: var(--black);
        margin:0;
    }

    body, input, button{
        
        font-size: 1.5rem;
    }

    h1, h2, h3, h4, h5, h6{
        font-family: 'Roboto Mono', monospace;
        font-weight:700;
    } 

    button{
        cursor:pointer;
    }

    a {
        text-decoration:none;
    }

`;
