import path from 'path';

const renderHomePage = (_, res) => {
  res.sendFile(path.resolve('src/index.html'));
};

export { renderHomePage };
