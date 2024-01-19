'use client';
import {
   FC,
   ReactNode,
   createContext,
   useState,
   Dispatch,
   SetStateAction,
   useLayoutEffect,
} from 'react';

interface ThemeContext {
   isDarkMode: boolean;
   toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

const ThemeProvider: FC<{
   children: ReactNode;
}> = ({ children }) => {
   const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

   useLayoutEffect(() => {
      const html = window.document.documentElement;
      html.classList.remove(!isDarkMode ? 'dark' : 'light');
      html.classList.add(isDarkMode ? 'dark' : 'light');
   }, [isDarkMode]);

   const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
   };

   return (
      <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
         {children}
      </ThemeContext.Provider>
   );
};

export default ThemeProvider;
