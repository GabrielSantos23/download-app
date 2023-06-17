/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lightTheme: {
          body: '#FFFFFF',
          card: '#F3F4F6',
          text: '#333333',
          toggleBorder: '#BDBDBD',
          buttonHover: '#E5E7EB',
          textDescription: '#6B7280',
          selection: '#FDE047',
          buttonText: '#FFFFFF',
          button: '#3B82F6',
          span: '#EF4444',
          nav: '#1F2937',
          scrollback: '#F9FAFB',
          textBig: '#1F2937',
          line: '#E5E7EB',
        },
        darkTheme: {
          body: '#111827',
          card: '#1F2937',
          text: '#F9FAFB',
          toggleBorder: '#4B5563',
          buttonHover: '#1E40AF',
          zIndex: '10',
          span: '#F87171',
          textDescription: '#D1D5DB',
          selection: '#4F46E5',
          buttonText: '#FFFFFF',
          button: '#3B82F6',
          nav: '#111827',
          scrollback: '#1F2937',
          textBig: '#F9FAFB',
          line: '#50545D',
        },
      },
    },
  },
  plugins: [],
};
