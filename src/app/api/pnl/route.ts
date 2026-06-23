import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit } from '@/lib/rateLimit';

interface PnLData {
  date: string;
  value: number;
}

async function handler(_req: NextRequest): Promise<NextResponse> {
  const data: PnLData[] = [];
  const today = new Date();
  let currentValue = 10000;

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.45) * 200;
    currentValue += change;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(currentValue * 100) / 100
    });
  }
  return NextResponse.json(data);
}

export async function GET(req: NextRequest) {
  return withRateLimit(req, handler, 'standard');
}