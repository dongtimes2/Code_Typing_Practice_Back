import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json('server_status_ok');
});

export default router;
