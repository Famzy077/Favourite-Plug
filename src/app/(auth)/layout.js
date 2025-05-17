import Footer from "../UI/Footer";
import '../../app/globals.css'
export default function AuthLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
