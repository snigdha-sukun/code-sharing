import { css } from "styled-components";

export const tablet = (styles: TemplateStringsArray) => css`
  @media (max-width: 768px) {
    ${styles}
  }
`;

export const mobile = (styles: TemplateStringsArray) => css`
  @media (max-width: 480px) {
    ${styles}
  }
`;
