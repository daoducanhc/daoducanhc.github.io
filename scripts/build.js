const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const marked = require('marked');
const frontMatter = require('front-matter');
const glob = require('glob');
const config = require('../site.config');

const srcPath = './src';
const distPath = config.build.outputPath;
const DIST_CNAME_PATH = `${distPath}/CNAME`;
const TEMP_CNAME_PATH = `./CNAME`;

// copy CNAME file out of distPath
if (process.env.NODE_ENV === 'production') {
  if (fse.existsSync(DIST_CNAME_PATH)) {
    fse.copyFileSync(DIST_CNAME_PATH, TEMP_CNAME_PATH);
    console.log('Move CNAME out successfully');
  }
}

// clear destination folder
fse.emptyDirSync(distPath);

// copy assets folder
fse.copy(`${srcPath}/assets`, `${distPath}/assets`);

// read pages
const files = glob.sync('**/*.@(md|ejs|html)', { cwd: `${srcPath}/pages` });

files.forEach((file, i) => {
  const fileData = path.parse(file);
  const destPath = path.join(distPath, fileData.dir);

  // create destination directory
  fse.mkdirsSync(destPath);

  // read page file
  const data = fse.readFileSync(`${srcPath}/pages/${file}`, 'utf-8');

  // render page
  const pageData = frontMatter(data);
  const templateConfig = Object.assign({}, config, {
    page: pageData.attributes
  });
  let pageContent;

  // generate page content according to file type
  switch (fileData.ext) {
    case '.md':
      pageContent = marked(pageData.body);
      break;
    case '.ejs':
      pageContent = ejs.render(pageData.body, templateConfig, {
        filename: `${srcPath}/pages/${file}`
      });
      break;
    default:
      pageContent = pageData.body;
  }

  // render layout with page contents
  const layout = pageData.attributes.layout || 'default';
  const layoutFileName = `${srcPath}/layouts/${layout}.ejs`;
  const layoutData = fse.readFileSync(layoutFileName, 'utf-8');
  const completePage = ejs.render(
    layoutData,
    Object.assign({}, templateConfig, {
      body: pageContent,
      filename: layoutFileName
    })
  );

  // save the html file
  fse.writeFileSync(`${destPath}/${fileData.name}.html`, completePage);
}

);

if (process.env.NODE_ENV === 'production') {
  if (fse.existsSync(TEMP_CNAME_PATH)) {
    fse.copyFileSync(TEMP_CNAME_PATH, DIST_CNAME_PATH);
    fse.removeSync(TEMP_CNAME_PATH);
    console.log(distPath);
    console.log('Copy CNAME back successfully');
  }
}
