const projects = require('./src/data/projects');

module.exports = {
  site: {
    title: 'NanoGen',
    description: 'Micro Static Site Generator in Node.js',
    basePath: process.env.NODE_ENV === 'production' ? '' : '',
    projects
  },
  build: {
    outputPath: process.env.NODE_ENV === 'production' ? './docs' : './output',
  }
};
