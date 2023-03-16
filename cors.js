import cors from 'vercel-cors';

export default cors({
  origin:
    process.env.NODE_ENV === 'development'
      ? '*'
      : 'https://ai-component-generator-git-feat-new-ui-microapp.vercel.app',
  headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'HEAD', 'POST'],
  expose: [],
  maxAge: undefined,
  credentials: false,
});
