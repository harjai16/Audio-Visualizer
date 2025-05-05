import './globals.css'

export const metadata = {
  title: 'Audio Visualizer',
  description: 'MP3 player with wave visualization',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 