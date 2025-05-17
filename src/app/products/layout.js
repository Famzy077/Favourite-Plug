export const metadata = {
  title: 'Favorite Plug',
  description: 'Gadget shop',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
