import { collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { database } from "../blogs/firestore";


const taskType = (data :any)=>{
    const dailyTasks = []
    const weeklyTasks = []
    const monthlyTasks = []
    const oneTimeTasks = []

    for (let index = 0; index < data.length; index++) {
        if (data[index].Type === 'One-Time') {
            oneTimeTasks.push(data[index])
        } else if (data[index].Type === 'Daily') {
            dailyTasks.push(data[index])

        } else if (data[index].Type === 'Weekly') {
            weeklyTasks.push(data[index])
        } else if (data[index].Type === 'Monthly') {
            monthlyTasks.push(data[index])
        }
        
    }
    console.log({oneTimeTasks,dailyTasks,weeklyTasks,monthlyTasks})
    return {oneTimeTasks,dailyTasks,weeklyTasks,monthlyTasks}
}
export async function GET(req:NextRequest) {
    try {
        // Reference to the 'blogs' collection
        const collectionRef = collection(database, 'tasks');

        // Fetch documents from the collection
        const response = await getDocs(collectionRef);

        // Map and log document data
        const docsData = response.docs.map((doc) => doc.data());
        // console.log(docsData);
        const data=taskType(docsData)

        // Return the documents data as JSON
        return NextResponse.json(data, { status: 200 });

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