import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'], theme: { extend: { colors: { ink:'#17233c', mist:'#f5f7fc', primary:'#6558e8' }, boxShadow: { soft:'0 12px 38px rgba(40,43,91,.06)' } } }, plugins: [] } satisfies Config;
