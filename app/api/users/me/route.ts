import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { getDateFromToken } from '../../../../helpers/detDateFromToken'

connect()


export async function GET(request: NextRequest) {
    try {
    // extract date from token
    const userId = await getDateFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")
    // check if there is no user
    return NextResponse.json({
       message: "User found",
       date: user
    })
    } catch (error:any) {
        return NextResponse.json({error: error.message}),
        {status: 500}
    }
    
}