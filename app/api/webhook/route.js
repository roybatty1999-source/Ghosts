import { NextResponse } from "next/server";

const globalScope = globalThis;

if (!globalScope.recentSignals) {
  globalScope.recentSignals = [];
}
if (!globalScope.lastSignalTime) {
  globalScope.lastSignalTime = null;
}

const batchGapMs = 10 * 60 * 1000;

export async function POST(req) {
  try {
    const payload = await req.json();
    const now = Date.now();

    if (
      globalScope.lastSignalTime &&
      now - globalScope.lastSignalTime > batchGapMs
    ) {
      globalScope.recentSignals = [];
    }

    globalScope.lastSignalTime = now;

    const cleanSymbol = String(payload.symbol || "").trim();
    const cleanExchange = String(payload.exchange || "").trim();
    const cleanPrice = String(payload.price || "").trim();

    if (!cleanSymbol) {
      return NextResponse.json(
        { error: "Missing symbol" },
        { status: 400 }
      );
    }

    const entry = {
      symbol: cleanSymbol,
      exchange: cleanExchange,
      price: cleanPrice,
      receivedAt: new Date(now).toISOString(),
    };

    const filtered = globalScope.recentSignals.filter(
      (item) => item.symbol !== cleanSymbol
    );

    globalScope.recentSignals = [entry, ...filtered].slice(0, 50);

    return NextResponse.json({
      ok: true,
      total: globalScope.recentSignals.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    signals: globalScope.recentSignals,
    lastSignalTime: globalScope.lastSignalTime,
  });
}
