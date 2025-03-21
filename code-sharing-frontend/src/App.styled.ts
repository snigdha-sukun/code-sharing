import styled from "styled-components";
import { mobile } from "./utils/mixins";

export const Container = styled.div`
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    gap: 1rem;

    ${mobile`
        padding: 1rem;
    `}
`;

export const SmallHeading = styled.h2`
    font-size: 2rem;

    ${mobile`
        font-size: 1.5rem;
    `}
    `;

export const LargeHeading = styled.h1`
    font-size: 2.5rem;

    ${mobile`
        font-size: 2rem;
    `}
`;

export const HeadingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
`;

export const StyledButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const DropDownContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

export const StyledEditorContainer = styled.div<{ $isDark: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 1rem;
    width: 100%;
    background-color: ${({ theme, $isDark }) => $isDark ? theme.colors.text : theme.colors.buttonText};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;