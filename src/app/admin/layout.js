export const metadata = {
  title: 'Admin-page',
  description: 'Favorite Admin Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
