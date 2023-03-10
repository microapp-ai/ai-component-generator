import cors from 'vercel-cors';

export default cors({
  origin: '*',
  headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'HEAD', 'POST'],
  expose: [],
  maxAge: undefined,
  credentials: false,
});
