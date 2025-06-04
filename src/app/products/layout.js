import '../globals.css'
import { WishlistProvider } from '../hooks/WishlistContext.jsx'
export const metadata = {
  title: 'Favorite Plug',
  description: 'Gadget shop',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </body>
    </html>
  )
}
