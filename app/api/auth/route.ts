import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const key=process.env.SECRET_KEY
const time = '2h'

export async function POST(req: NextRequest) {
    if (!key) {
        return NextResponse.json({status:500})
    }

    try {
        // Parse the JSON body of the request
        const credentials = await req.json();

        // Log the received credentials for debugging
        // console.log('Received credentials:', credentials);

        // Example: Simple validation (replace with your actual logic)
        const { username, password } = credentials;
        if (username === 'admin' && password === 'password123') {
            const token = jwt.sign({ username }, key, { expiresIn: time });

            // Return a success response
            return NextResponse.json({ token, time }, { status: 200 });
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
