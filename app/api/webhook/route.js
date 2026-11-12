import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { status: 'online', message: 'Il webhook è attivo e pronto a ricevere i dati da TradingView' }, 
    { status: 200 }
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Segnale ricevuto da TradingView:", body);
    return NextResponse.json(
      { status: 'success', message: 'Webhook ricevuto correttamente', data: body }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore nel parsing del webhook:", error);
    return NextResponse.json(
      { status: 'error', message: error.message }, 
      { status: 400 }
    );
  }
}
