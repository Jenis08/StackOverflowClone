import express from 'express';

import { addQuestion, updateQuestion, deleteQuestion, getAllQuestion, downvote, upvote, addComment } from '../controller/ques.js';

const router = express.Router();

router.post('/addQues', addQuestion);

router.post('/updateQues/:id', updateQuestion);

router.delete('/delete/:id', deleteQuestion);

router.get('/getall', getAllQuestion);

router.put('/upvote/:id', upvote);

router.put('/downvote/:id', downvote);

router.put('/comment/:id', addComment);
export default router;