import styled from "styled-components";

export const StyledButton = styled.button`
    all: unset;
    cursor: pointer;
    padding: 0.8rem 2rem;
    border: none;
    font-size: 1rem;
    border-radius: 2rem;
    background-color: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.buttonText};
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover, &:focus {
        background-color: ${({ theme }) => theme.colors.text};
    }

    &:disabled {
        background-color:${({ theme }) => theme.colors.buttonDisabled};
        cursor: not-allowed;
    }
`;
