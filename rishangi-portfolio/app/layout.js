import "./globals.css";

export const metadata = {
  title: "Rishangi | MERN Stack Developer",
  description:
    "Portfolio of Rishangi, MERN Stack Developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}