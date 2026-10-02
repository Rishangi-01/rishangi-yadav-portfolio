import './globals.css';

export const metadata = {
  title: 'Portfolio Admin',
  description: 'Admin dashboard for portfolio management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
