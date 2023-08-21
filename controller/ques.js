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

export const deleteQuestion = async (req, res) => {
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
        } catch (e) {
            return res.status(200).json({
                message: e,
                success: false
            });
        }
    });
}

export const getAllQuestion = async (req, res) => {
    res.json(await Question.find().populate('userID', ['username']));
};

export const upvote = async (req, res) => {

    const id = req.params.id;
    try {
        const PostDoc = await Question.findById(id);

        if (!PostDoc) {
            return res.status(404).json({
                message: "Question not found",
                success: false
            });
        }
        PostDoc.upvotes += 1;

        await PostDoc.save();
        res.json({
            message: "Upvoted successfully",
            success: true
        });
    }
    catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};

export const downvote = async (req, res) => {

    const id = req.params.id;
    try {
        const PostDoc = await Question.findById(id);

        if (!PostDoc) {
            return res.status(404).json({
                message: "Question not found",
                success: false
            });
        }
        PostDoc.downvotes += 1;

        await PostDoc.save();
        res.json({
            message: "Downvoted successfully",
            success: true
        });
    }
    catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};

export const addComment = async (req, res) => {
    const id = req.params.id;
    const { comment } = req.body;

    const PostDoc = await Question.findById(id);

    if (!PostDoc) {
        return res.status(404).json({
            message: "Question not found",
            success: false
        });
    }

    try {
        await Question.findOneAndUpdate({ _id: id },
            { $push: { comments: comment } },
            { new: true }
        )

        res.status(200).json({
            message: "Comment added Successfully",
            success: true,
            data: PostDoc
        });
    } catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};

