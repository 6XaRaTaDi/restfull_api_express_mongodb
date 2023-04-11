import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

router.get('/test', (req, res) => {
  res.json('test router')
})
router.post('/test_post', (req, res) => {
  const data = req.body
  res.json({...data})
})
export default router