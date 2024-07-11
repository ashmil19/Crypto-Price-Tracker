import userModel from "../models/userModel.js";
import { sendOtp } from "../utils/sendOtp.js";
import hash from "../utils/toHash.js";

const createUser = async (req, res) => {
    try {

        const {
            fullname,
            email,
            password
        } = req.body

        const isUserExist = await userModel.findOne({ email });

        if (isUserExist) {
            res.status(404).json({ message: "This user already exist" })
            return
        }

        const hashedPassword = await hash(password);

        const newUser = userModel({
            fullname,
            email,
            password: hashedPassword,
        })

        await newUser.save()
        const result = await sendOtp({ fullname, email })

        const options = {
            httpOnly: true,
            secure: true,
        };

        res.cookie("hashOtp", result, options);
        res.cookie("id", newUser._id, options);
        res.status(201).json({ message: "user created successfully" })
    } catch (error) {
        console.log(error);
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { hashOtp, id } = req.cookies;
        if (!hashOtp) {
            res.status(403).json({ message: "OTP is expired" });
            return;
        }
        const { otp } = req.body;
        const verified = await bcrypt.compare(otp, hashOtp);
        if (!verified) {
            res.status(403).json({ message: "OTP is wrong" });
            return;
        }

        await userModel.findByIdAndUpdate(id, { $set: { isVerify: true } });
        res.status(200).json({ message: "OTP verification success" });
    } catch (error) {
        next(error);
    }
};

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await userModel.findOne({ email: email });

        if (!userData) {
            res.status(400).json({ message: "The account is not exist" });
            return;
        }

        const passMatch = await bcrypt.compare(password, userData.password);

        if (!passMatch) {
            res.status(400).json({ message: "The Password is Wrong" });
            return;
        }

        if (userData.isVerify === false) {
            return res.status(400).json({ message: "You need verify account" });
        }

        const accessToken = jwt.sign(
            { userId: userData._id},
            process.env.ACCESS_TOKEN_SECRET,
        );

        userData.accessToken = accessToken;
        await userData.save();

        // res.cookie("jwt", accessToken, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000 * 7,
        // });

        res.status(200).json({
            accessToken,
            fullname: userData.fullname,
            userId: userData._id,
            message: "your account is verified",
        });
    } catch (error) {
        next(error);
    }
};


const authController = {
    createUser,
    verifyOtp,
    handleLogin
}

export default authController