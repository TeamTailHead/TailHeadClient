import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
        font-size: 100%;
    }

    
    :not(input):not(textarea),
    :not(input):not(textarea)::after,
    :not(input):not(textarea)::before {
        -webkit-user-select: none;
        user-select: none;
    }

    input,
    button,
    textarea,
    :focus {
        outline: none;
    }
`;

export default GlobalStyle;
