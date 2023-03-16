import cors from 'vercel-cors';

export default cors({
  origin:
    process.env.NODE_ENV === 'development'
      ? '*'
      : `https://${process.env.VERCEL_URL}`,
  headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'HEAD', 'POST'],
  expose: [],
  maxAge: undefined,
  credentials: false,
});
