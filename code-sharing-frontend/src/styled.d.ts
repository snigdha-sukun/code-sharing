import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			text: string;
			dropdown: string;
			button: string;
			buttonText: string;
			buttonDisabled: string;
			link: string;
		};
		fontSizes: {
			base: string;
		};
		fontWeights: {
			base: number;
			bold: number;
		};
	}
}
