import jwt from 'jsonwebtoken';

export const sendCookie = (doc, res, username, statusCode = 200) => {
    jwt.sign({ username, id: doc._id }, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({
            id: doc._id,
            message: 'login successfull',
            success: true
        });
    });
}