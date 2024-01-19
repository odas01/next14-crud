import type { Config } from 'tailwindcss';

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         boxShadow: {
            dark: '0px 2px 2px rgba(255,255,255,0.3)',
            light: '0px 2px 2px rgba(0,0,0,0.3)',
         },
      },
   },
   darkMode: 'class',
   plugins: [],
};
export default config;
