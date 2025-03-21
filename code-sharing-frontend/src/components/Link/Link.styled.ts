import styled from "styled-components";

export const StyledLink = styled.a<{ $isDark: boolean }>`
    color: ${({ theme, $isDark }) => ($isDark ? theme.colors.dropdown : theme.colors.link)};
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSizes.base};
    transition: text-decoration 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 10rem;
        direction: rtl;
        text-align: left;
    }

    &:hover, &:focus {
        text-decoration: underline;
    }
`;
