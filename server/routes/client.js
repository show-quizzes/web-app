/* eslint new-cap: "off" */

import { Router } from 'express';
import fs from 'fs';

const router = Router();

const questions = fs.readFileSync(__dirname + '/../data/questions.json', 'utf8');
const state = JSON.parse(questions)[1];
const questionDefaults = {
  isAnswered: true,
  isCorrect: false,
  response: null,
  responses: [
    "you ignorant slut. that's incorrect.",
    "perfectenschlag. that's correct.",
    "you miss 100% of the shots you don’t take. choose wisely."
  ]
};

router.get('/', (req, res) => {
  const initialState = Object.assign({}, {
    app: Object.assign({}, state, questionDefaults)
  });

  res.render('index.html', {
    initialState: JSON.stringify(initialState)
  });
});

export default router;
