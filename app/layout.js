export const metadata = {
  title: 'Breakout & Bias Dashboard',
  description: 'Monitoraggio segnali TradingView in tempo reale',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f9f9f9' }}>
        {children}
      </body>
    </html>
  );
}
