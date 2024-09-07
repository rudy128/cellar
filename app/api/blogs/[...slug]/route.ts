import { updateDoc,getDoc, doc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import {database} from '../firestore'

// Handle GET request
export async function GET(request: NextRequest) {
  const reqPath = request.url
  const pathnameList = reqPath.split('/')
  const path = pathnameList[pathnameList.length -1]


  try {
    const docRef = doc(database, 'blogs', path)
    const res = await getDoc(docRef)

    if (res.exists()){
      const data = res.data()
      return NextResponse.json({data},{status: 200})
    } else {
      return NextResponse.json({error: 'No such document'},{status: 401})
    }
  } catch (err) {
    return NextResponse.json({error: "Couldn't get the requested blog"},{status: 501})    
  }

}


export async function POST(req: NextRequest) {
  const reqPath = req.url;
  try {
    const requestBody = await req.json(); // Await the promise to get the JSON data
    const { commenter, comment } = requestBody;
    const pathnameList = reqPath.split('/');
    const path = pathnameList[pathnameList.length - 2];

    const docRef = doc(database, 'blogs', path);
    await updateDoc(docRef, {
      [`Comments.${commenter}`]: comment,
    });

    return NextResponse.json({ message: 'Comment added successfully' }, { status: 200 });
  } catch (err) {
    console.error("Error updating document:", err); // Log error for debugging
    return NextResponse.json({ error: "Couldn't update the requested blog" }, { status: 500 }); // 500 Internal Server Error is more appropriate for server issues
  }
}

// export async function POST(req:NextRequest) {
//   const reqPath = req.url
//   const request = req.json()
//   const {commenter, comment} = await request
//   const pathnameList = reqPath.split('/')
//   const path = pathnameList[pathnameList.length -2]
//   try {
//     const docRef = doc(database, "blogs", path);
//     const res = await updateDoc(docRef,{
//       [`Comments.${commenter}`]: comment,
//     })
//     return NextResponse.json({message:"Got you bitch"},{status: 200})    
//   } catch (err) {
//     return NextResponse.json({error: "Couldn't get the requested blog"},{status: 501})    
//   }

// }

// Handle other HTTP methods if needed (POST, PUT, DELETE, etc.)
// export async function POST(request: NextRequest) {
//   const data = await request.json();
//   return NextResponse.json({
//     message: 'POST request received',
//     data: data,
//   });
// }
