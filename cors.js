import cors from 'vercel-cors';

export default cors({
  origin:
    process.env.NODE_ENV === 'development' ? '*' : 'https://www.microapp.ai',
  headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'HEAD', 'POST'],
  expose: [],
  maxAge: undefined,
  credentials: false,
});
