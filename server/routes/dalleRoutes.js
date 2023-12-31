import express from 'express';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
  
// const openai = new OpenAIApi(configuration);
const openai = new OpenAI({
    apiKey: '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', // This is also the default, can be omitted
});

router.route('/').get((req, res) => {
    res.send('Hello from Image.AI');
});

router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;

      const aiResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });
      
      const image = aiResponse.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (error) {
      console.error(error);
      res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
  });

export default router;
