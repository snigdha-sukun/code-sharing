import { useEffect, useRef, useState } from "react";
import {
	StyledArrowIcon,
	StyledCustomSelect,
	StyledDropdownItem,
	StyledDropdownList,
	StyledSelectHeader,
} from "./Dropdown.styled";

const Dropdown = ({
	options,
	selectedValue,
	onChange,
}: {
	options: { value: string; label: string }[];
	selectedValue: string;
	onChange: (val: string) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const selectedOption =
		options.find((option) => option.value === selectedValue) || options[0];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleOptionClick = (value: string) => {
		if (selectedValue !== value) {
			onChange(value);
		}
		setIsOpen(false);
	};

	return (
		<StyledCustomSelect ref={dropdownRef}>
			<StyledSelectHeader onClick={() => setIsOpen(!isOpen)}>
				{selectedOption.label}
				<StyledArrowIcon $isOpen={isOpen}>
					<img src="/down arrow.svg" alt="down arrow" />
				</StyledArrowIcon>
			</StyledSelectHeader>
			{isOpen && (
				<StyledDropdownList>
					{options.map((option) => (
						<StyledDropdownItem
							key={option.value}
							onClick={() => handleOptionClick(option.value)}
							$isSelected={option.value === selectedValue}
						>
							{option.label}
						</StyledDropdownItem>
					))}
				</StyledDropdownList>
			)}
		</StyledCustomSelect>
	);
};

export default Dropdown;
