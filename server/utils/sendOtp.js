import sendMail from './sendMail.js'
import hash from './toHash.js'

const otpGenerate = async () => {
  try {
    const digits = "0123456789";
    let OTP = "";

    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

    const secret = await hash(OTP);

    return { secret, OTP };
  } catch (error) {
    console.log(error);
  }
};

export const sendOtp = async (user) => {
  try {
    const result = await otpGenerate();

    const option = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "OTP Verification",
      text: "Don't share the code",
      html: `<p>Your OTP  is <b>${result.OTP}</b></p>`,
    };

    console.log("before", result.OTP);

    await sendMail(option);
    return result.secret;
  } catch (error) {
    console.log(error);
  }
};


