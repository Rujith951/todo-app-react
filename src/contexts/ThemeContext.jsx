import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeContextProvider(props) {
	const [theme, setTheme] = useState("DARK");

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
}
