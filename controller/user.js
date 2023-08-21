import { User } from "../model/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendCookie } from '../util/sendCookie.js';

const salt = bcrypt.genSaltSync(10);

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        await User.create({ username, password: await bcrypt.hashSync(password, salt) });
        res.status(200).json({
            message: 'User Created',
            success: true
        })
    }
    catch (e) {
        res.status(400).json({
            message: e,
            success: false
        });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    const UserDoc = await User.findOne({ username });

    const passOk = bcrypt.compareSync(password, UserDoc.password);

    if (passOk) {
        sendCookie(UserDoc, res, username);
    }
    else {
        res.status(400).json({
            message: "Invalid Credentials",
            success: false
        });
    }
};

export const profile = (req, res) => {
    const { token } = req.cookies;
    
    if(!token) res.status(401).json({
        message: 'No loggedin user',
        success: false
    });
    
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
        if (err) throw err;
        res.status(200).json({
            user: info,
            success: true
        });
    })
};

export const logout = (req, res) => {
    res.cookie('token', '').json({
        message: `Logout Success`,
        success: true
    });
};
