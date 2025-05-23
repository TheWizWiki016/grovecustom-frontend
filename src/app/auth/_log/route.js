// En Next 13 /app/api/auth/_log/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json();
    // Aquí maneja el login o lo que se necesite

    // Por ejemplo, devuelve algo:
    return NextResponse.json({ success: true, message: 'Login processed' });
}
