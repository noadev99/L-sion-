/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'noir-profond': '#0a0a0a',
                'noir-doux': '#1a1a1a',
                'blanc-casse': '#f5f3f0',
                'gris-cendre': '#8a8a8a',
                'gris-clair': '#e5e3e0',
                'gris-moyen': '#6a6a6a',
                'bleu-desature': '#7a8fa3',
                'bleu-souvenir': '#9bb5c9',
                'bleu-profond': '#4a5f73',
                'terre-seche': '#c9b8a8',
                'rose-fane': '#d4a5a5',
                'vert-mousse': '#8a9a8a',
            },
            fontFamily: {
                display: ['Cormorant Garamond', 'Georgia', 'serif'],
                body: ['Inter', 'system-ui', 'sans-serif'],
                accent: ['Playfair Display', 'Georgia', 'serif'],
            },
            fontSize: {
                'hero': ['8rem', { lineHeight: '1' }],
                'hero-mobile': ['3.5rem', { lineHeight: '1' }],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            transitionDuration: {
                'slow': '800ms',
                'slower': '1200ms',
                'slowest': '2000ms',
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'in-out-expo': 'cubic-bezier(0.65, 0, 0.35, 1)',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out',
                'fade-in-up': 'fadeInUp 0.8s ease-out',
                'breathe': 'breathe 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                breathe: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.02)' },
                },
            },
        },
    },
    plugins: [],
}
