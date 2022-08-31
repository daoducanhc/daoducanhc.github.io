const projects = require('./src/data/projects');

module.exports = {
  site: {
    title: 'Chris Dao\'s Blog',
    description: '???',
    basePath: process.env.NODE_ENV === 'production' ? '' : '',
    projects
  },
  build: {
    outputPath: process.env.NODE_ENV === 'production' ? './docs' : './public',
  }
};
