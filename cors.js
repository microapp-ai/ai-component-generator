import cors from 'vercel-cors';

export default cors({
  origin: 'https://ai-component-generator-delta.vercel.app',
  headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'HEAD', 'POST'],
  expose: [],
  maxAge: undefined,
  credentials: false,
});
