import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Audio Visualizer',
  description: 'MP3 player with wave visualization',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-16 pb-24">
          {children}
        </main>
      </body>
    </html>
  )
} 