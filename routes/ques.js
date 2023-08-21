import express from 'express';

import { addQuestion, updateQuestion, deleteQuestion } from '../controller/ques.js';
const router = express.Router();

router.post('/addQues', addQuestion);

router.post('/updateQues/:id', updateQuestion);

router.delete('/delete/:id', deleteQuestion);

router.get()
export default router;