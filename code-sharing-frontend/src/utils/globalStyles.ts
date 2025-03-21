import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  body {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.base};
    color: ${({ theme }) => theme.colors.text};
  }
`;