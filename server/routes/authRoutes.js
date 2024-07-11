import { Router } from 'express'
import authController from '../controller/authController.js'

const router = Router()

router.post("/register", authController.createUser)
router.post("/login", authController.handleLogin)
router.post("/otpVerify", authController.verifyOtp)

export default router
