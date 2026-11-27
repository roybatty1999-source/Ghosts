'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [signalList, setSignalList] = useState([]);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const response = await fetch('/api/webhook', { cache: 'no-store' });
        const data = await response.json();
        if (Array.isArray(data.signals)) {
          setSignalList(data.signals);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSignals();
    const intervalId = setInterval(fetchSignals, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (isoString) => {
    if (!isoString) return '-';
    const parsed = new Date(isoString);
    if (Number.isNaN(parsed.getTime())) return '-';
    return parsed.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <main style={{ padding: '1.5rem', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#111' }}>Siberiani</h1>
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
            {signalList.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '16px', textAlign: 'center', color: '#666' }}>In attesa di segnali...</td>
              </tr>
            ) : (
              signalList.map((item, index) => (
                <tr key={item.symbol + index} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '12px 16px', color: '#333' }}>{formatTime(item.receivedAt)}</td>
                  <td style={{ padding: '12px 16px', fontWeight: '600' }}>{item.symbol}</td>
                  <td style={{ padding: '12px 16px', color: '#666' }}>{item.exchange}</td>
                  <td style={{ padding: '12px 16px', color: '#666' }}>{item.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
