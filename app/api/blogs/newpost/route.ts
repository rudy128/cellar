import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { doc, getDocs, collection, setDoc, Timestamp } from "firebase/firestore";
import { database } from "../firestore";

async function newDoc() {
    const docsSnap = await getDocs(collection(database, 'blogs'))
    const docs = docsSnap.docs.map(doc=>doc.id)
    if (docs[docs.length -1]) {
        const num = docs[docs.length -1].split('-')
        return `blog-${parseInt(num[num.length -1]) + 1}`
    } else {
        return `blog-1`
    }
}

export async function POST(req:NextRequest) {
    const key = process.env.SECRET_KEY
    const token = req.headers.get('Authorization')?.split(" ")[1]
    if (token && key) {
        try {
            const decoded = jwt.verify(token, key)
            const reqBody = await req.json()
            const {title,badges,content} = reqBody

            const docRef = setDoc(doc(database,'blogs',await newDoc()), {
                Title:title,
                Content: content,
                Comments: {},
                Date: Timestamp.now(),
                Badges : badges
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