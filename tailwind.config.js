export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
          DEFAULT: 'hsl(197 89% 70%)', // #6ccaf1
          foreground: 'hsl(210 60% 20%)', // やや暗め（テキスト強調）
        },
        secondary: {
          DEFAULT: 'hsl(197 70% 90%)', // 淡い水色（#e1f5fd）
          foreground: 'hsl(210 60% 20%)', // やや暗め（テキスト強調）
        },
        destructive: {
          DEFAULT: 'hsl(0 84% 60%)', // 赤系エラー色（#ef4444）
          foreground: 'hsl(0 0% 100%)', // 白
        },
        outline: {
          DEFAULT: 'hsl(197 89% 70%) / 0.5', // primary の 50% 透過
          foreground: 'hsl(197 89% 70%)', // 本体と同じ青
        },
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [],
}
