import { StyledButton } from "./Button.styled";

const Button = ({isShared, handleClick } : {isShared: boolean; handleClick: () => void}) => {
	return (
		<StyledButton onClick={handleClick} disabled={isShared}>
			<span><img src="/Share.svg" alt="Share" /></span>Share
		</StyledButton>
	);
};

export default Button;
