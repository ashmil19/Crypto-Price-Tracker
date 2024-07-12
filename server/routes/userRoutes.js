import { Router } from "express";
import userController from '../controller/userController.js'

const router = Router()

router.get("/getCrypto", userController.getCrypto)
router.get("/search", userController.handleSearch)
router.get("/searchData", userController.getSearches)
router.delete("/searchData", userController.deleteSearch)

export default router