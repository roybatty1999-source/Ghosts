export default function Dashboard() {
  return (
    <main style={{ padding: '1.5rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#111' }}>Breakout & Bias Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Monitoraggio in tempo reale dei segnali di TradingView</p>
      
      <div style={{ overflowX: 'auto', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #eaeaea' }}>
              <th style={{ padding: '12px 16px', fontWeight: '600', color: '#333' }}>Orario</th>
              <th style={{ padding: '12px 16px', fontWeight: '600', color: '#333' }}>Simbolo</th>
              <th style={{ padding: '12px 16px', fontWeight: '600', color: '#333' }}>Exchange</th>
              <th style={{ padding: '12px 16px', fontWeight: '600', color: '#333' }}>Prezzo</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eaeaea' }}>
              <td style={{ padding: '12px 16px', color: '#666' }}>In attesa di segnali...</td>
              <td style={{ padding: '12px 16px', fontWeight: '500' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#666' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#666' }}>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
