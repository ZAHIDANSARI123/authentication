import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        // validation
        console.log(reqBody);

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({error: "User does not exists"},
            {status: 400})
        }
        console.log("User exits");

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({error: "Check your credentials"},
            {status: 400})
        }
        console.log("user");
        

        // create token date
        const tokenData = {
            id: user.id,
            username:user.email,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.
        TOKEN_SECRET!, { expiresIn: '1d' })

        const reponse = NextResponse.json({
            message: "Logged In success",
            success: true,
        })

        reponse.cookies.set("token", token, {
            httpOnly: true
        })
        return reponse
    } catch (error:any) {
        return NextResponse.json({error: error.message}),
        {status: 500}
    }
}


