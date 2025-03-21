import styled from "styled-components";

export const StyledCustomSelect = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 0.625rem;
  text-wrap: nowrap;
  width: auto;
`;

export const StyledSelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.dropdown};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
`;

export const StyledArrowIcon = styled.span<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s;
`;

export const StyledDropdownList = styled.ul`
  position: absolute;
  bottom: 110%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.dropdown};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  padding: 0;
  list-style: none;
  z-index: 100;
  width: fit-content;
  max-height: 10rem;
  overflow-y: auto;
`;

export const StyledDropdownItem = styled.li<{ $isSelected: boolean }>`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.dropdown};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ $isSelected, theme }) =>
		$isSelected ? theme.fontWeights.bold : theme.fontWeights.base};
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.link};
    color: ${({ theme }) => theme.colors.buttonText};
  }
`;
