import { NextResponse } from 'next/server';
import { recentSignals } from '@/lib/signals';

export async function GET() {
  return NextResponse.json(recentSignals, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    const signalItem = {
      time: new Date().toLocaleTimeString(),
      symbol: body.symbol || 'N/A',
      exchange: body.exchange || 'N/A',
      price: body.price || 'N/A'
    };

    // Aggiunge il nuovo segnale in cima alla lista
    recentSignals.unshift(signalItem);

    // Mantiene solo gli ultimi 20 segnali
    if (recentSignals.length > 20) {
      recentSignals.pop();
    }

    return NextResponse.json(
      { status: 'success', message: 'Segnale salvato in memoria' }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: error.message }, 
      { status: 400 }
    );
  }
}
