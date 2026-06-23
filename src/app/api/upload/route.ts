import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit } from '@/lib/rateLimit';

async function handler(_req: NextRequest): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Upload temporarily disabled' },
    { status: 503 }
  );
}

export async function POST(req: NextRequest) {
  return withRateLimit(req, handler, 'submission');
}