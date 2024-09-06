import {NextAuthOptions} from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';

const values = {
    username: 'rudues',
    password: 'rudy128'
}

export const authOptopns : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text", placeholder: "Rudy"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials:any): Promise<any>{
                try {
                    if (credentials.identifier.email === values.username){
                        if (credentials.identifier.password === values.password) {
                            console.log("hello")
                            return 'Rudues'
                        }
                    }
                } catch (err:any) {
                    throw new Error(err)
                }
            }
        })
    ],
    callbacks: {
        
    },
    pages: {
        signIn: '/login'
    },
    session:{
        strategy: 'jwt'
    },
    secret : 'rudy128'
}