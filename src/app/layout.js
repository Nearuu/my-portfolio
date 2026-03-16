import "./globals.css";
import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress"; //

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        
        <ScrollProgress /> 
        
        <Navbar />
        {children}
      </body>
    </html>
  );
}