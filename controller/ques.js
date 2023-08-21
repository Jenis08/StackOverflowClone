import { Question } from '../model/Question.js';
import jwt from 'jsonwebtoken';

export const addQuestion = async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
        if (err) throw err;
        const { question } = req.body;
        const PostQue = await Question.create({
            question: question,
            userID: info.id
        })
        res.json({
            message: "success",
            data: PostQue
        })
    });
};


export const updateQuestion = async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
        if (err) throw err;
        const { question } = req.body;
        const id = req.params.id;
        const PostDoc = await Question.findById(id);

        const isAuthor = JSON.stringify(PostDoc.userID) === JSON.stringify(info.id);

        if (!isAuthor) {
            return res.status(400).json({
                message: 'you are not the creator',
                success: false
            });
        }

        const updateData = { question };

        const updateQues = await Question.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true });

        return res.status(200).json({
            message: 'question updated',
            success: true,
            data: updateQues
        });
    });
};

export const deleteQuestion = (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
        if (err) throw err;
        const id = req.params.id;
        const PostDoc = await Question.findById(id);
        const isAuthor = JSON.stringify(PostDoc.userID) === JSON.stringify(info.id);

        if (!isAuthor) {
            return res.status(400).json({
                message: 'you are not the creator',
                success: false
            });
        }

        try {
            await Question.deleteOne({ _id: id });
            return res.status(200).json({
                message: 'Question deleted',
                success: true
            });
        }catch(e){
            return res.status(200).json({
                message: e,
                success: false
            });
        }
    });
}