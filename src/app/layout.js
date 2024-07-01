import "./globals.css";


export const metadata = {
  title: "bCalc | MD Tuhin Hasnat",
  description: "A basic calculator",
  icons:{
    icon: "./favicon.png",
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <h1 className="logo">bCalc</h1>
          </header>
          <div className="wrapper">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
