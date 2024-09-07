import { NextRequest, NextResponse } from 'next/server'
import {app, database} from './firestore'
import {collection, getDocs} from 'firebase/firestore'


export async function GET(req:NextRequest) {
    try {
        // Reference to the 'blogs' collection
        const collectionRef = collection(database, 'blogs');

        // Fetch documents from the collection
        const response = await getDocs(collectionRef);

        // Map and log document data
        const docsData = response.docs.map((doc) => doc.data());
        // console.log(docsData);

        // Return the documents data as JSON
        return NextResponse.json(docsData, { status: 200 });

        // Example: Simple validation (replace with your actual logic)
        // const { username, password } = credentials;
        // if (username === 'admin' && password === 'password123') {
        //     // const token = jwt.sign({ username }, 'wrath', { expiresIn: '1h' });

        //     // Return a success response
        // } else {
        //     // Return an error response for invalid credentials
        //     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        // }
    } catch (error) {
        console.error('Error processing request:', error);

        // Return an error response if something goes wrong
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}