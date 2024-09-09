import { collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { database } from "../../blogs/firestore";
import jwt from "jsonwebtoken";

async function newTask() {
    const docsSnap = await getDocs(collection(database, 'tasks'))
    const docs = docsSnap.docs.map(doc=>doc.id)
    if (docs[docs.length -1]) {
        const num = docs[docs.length -1].split('-')
        return `task-${parseInt(num[num.length -1]) + 1}`
    } else {
        return `task-1`
    }
}


export async function POST(req: NextRequest) {
    const key = process.env.SECRET_KEY
    const token = req.headers.get('Authorization')?.split(" ")[1]
    if (token && key) {
        try {
            const decoded = jwt.verify(token, key)
            const reqBody = await req.json()
            const {task,badges,type,exp,dateTime} = reqBody

            const docRef = setDoc(doc(database,'tasks',await newTask()), {
                Task: task,
                Badges: badges,
                Type: type,
                Exp: exp,
                Date: Timestamp.now(),
                ExpirationTime:dateTime,
                Completed: false
            })            
            return NextResponse.json({message: "New Blog Created Successfully"},{status:201})
        } catch (err) {
            console.error('Error: ',err)
            return NextResponse.json({error: "Not Authorized"},{status: 401})
        }
    } else {
        return NextResponse.json({message: "Couldn't even sent a request"},{status: 501})
    }

}