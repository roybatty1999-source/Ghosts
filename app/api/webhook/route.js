import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Legge il pacchetto JSON inviato da TradingView tramite webhook
    const body = await request.json();
    
    console.log("Segnale ricevuto da TradingView:", body);

    // Qui potrai successivamente aggiungere la logica per salvare i dati su Supabase
    
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
