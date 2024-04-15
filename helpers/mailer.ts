import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'



export const sendEmail = async ({email, eamilType, userId}:any) =>
{
    try {
      // TODO: configure mail for usage
      const hashedToken = await bcryptjs.hash(userId.toString
      (), 10)
      
      // const hashedToken = "abskhd"
      console.log("MAIL", userId);
      console.log("EMAIL TYPE", eamilType);
      console.log(typeof eamilType);
      
    
      if (eamilType === "VERIFY") {
      const updateUser = await User.findByIdAndUpdate
      (userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000) // 1 hours 
        }
      });
      console.log("Updated user for verify", updateUser);
      
      
      }else if(eamilType === " RESET"){
        await User.findByIdAndUpdate(userId,
        {forgotPaswwordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
      }

        // var
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
            from: '"jahid@google.com', // sender address
            to: "email", // list of receivers
            subject: eamilType === 'verify' ? "verify your email" : "Reset your password",
            html: "<b>Hello world?</b>",
          }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}