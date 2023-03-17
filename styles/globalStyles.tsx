import { createGlobalStyle } from "styled-components";
import { Fira_Sans } from "@next/font/google";

const firaSans = Fira_Sans({
    subsets: ["cyrillic-ext", "latin"],
    weight: ["400", "500", "600", "700"]
});

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: ${firaSans.style.fontFamily}
  }

  body {
    margin: 0;
    padding: 0;
    
    background: #1b1b1b;
    font-family: ${firaSans.style.fontFamily}
    font-weight: 500;
  }
`;

export default GlobalStyle;