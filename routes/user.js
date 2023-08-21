import express from 'express';
import { register, login, profile, logout } from '../controller/user.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/profile', profile);

router.post('/logout', logout);

export default router;