import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON body of the request
        const credentials = await req.json();

        // Log the received credentials for debugging
        console.log('Received credentials:', credentials);

        // Example: Simple validation (replace with your actual logic)
        const { username, password } = credentials;
        if (username === 'admin' && password === 'password123') {
            const token = jwt.sign({ username }, 'wrath', { expiresIn: '1h' });

            // Return a success response
            return NextResponse.json({ token }, { status: 200 });
        } else {
            // Return an error response for invalid credentials
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        console.error('Error processing request:', error);

        // Return an error response if something goes wrong
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
