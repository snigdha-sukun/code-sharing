import { StyledLink } from "./Link.styled";

const Link = ({
	link,
	isDark,
}: { link: string | undefined; isDark: boolean }) => {
	if (!link) return <></>;
	return (
		<StyledLink
			href={`${window.location.origin}/${link}`}
			target="_blank"
			rel="noreferrer"
			aria-label="link"
			$isDark={isDark}
		>
			{isDark ? (
				<img src="/link_dark-mode.svg" alt="Link" />
			) : (
				<img src="/link.svg" alt="Link" />
			)}
			<span>{link}</span>
		</StyledLink>
	);
};

export default Link;
