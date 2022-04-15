/**
 * @file _scripts/add-layout-field-to-fixed-pages.js
 * @description Pre-build script used to programatically add a layout field to fixed-pages files' frontmatter.
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
const fs = require('fs/promises');

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------
/**
 * @constant
 * @type {string}
 * @description Path to the `src/pages` folder.
 */
const PAGES_DIR = '../src/pages/';

//------------------------------------------------------------------------------
// Functions
//------------------------------------------------------------------------------
/**
 * Reads files from `/src/pages` inserts a layout field to fixed-pages files' frontmatter if not already present.
 * 
 * @returns {bool} 
 */
async function main() {
  let filenames = await fs.readdir(PAGES_DIR);

  for (let filename of filenames) {
    // Get file extension
    let slicePointForFileExtension = filename.indexOf('.');
    let fileExtension = filename.slice(slicePointForFileExtension);

    // Skip any non markdown files
    if (fileExtension !== '.md') {
      continue;
    }

    // Get filename prefix
    let filePrefix = filename.slice(0, slicePointForFileExtension);

    // Handle special case for .md files that have hyphes in name
    if (filePrefix.includes('-')) {
      // Split on hyphens
      filePrefix = filePrefix.split('-');
      // Capitalize each first letter join into single string
      let capitalized = [];
      filePrefix.forEach(word => capitalized.push(word.charAt(0).toUpperCase() + word.slice(1)));
      filePrefix = capitalized.join('');
    }
    // If no hyphens in filename prefix, simply capitalize first letter for layout
    else {
      filePrefix = filePrefix.charAt(0).toUpperCase() + filePrefix.slice(1);
    }

    console.log('filePrefix: ', filePrefix);

    // Get file content and convert to string
    let content = await fs.readFile(`${PAGES_DIR}${filename}`);
    content = String(content);

    // Skip any files that already have a layout field
    if (content.includes('layout:')) {
      console.log('skip ', filePrefix);
      continue;
    }

    // Add layout field and write updated content to file
    content = content.replace('---', `---\nlayout: "../layouts/${filePrefix}.astro"`);
    await fs.writeFile(`${PAGES_DIR}${filename}`, content);
  }

  return true;
}

//------------------------------------------------------------------------------
// Run main function script is called directly
//------------------------------------------------------------------------------
if (require.main === module) {
  (async() => { 
    let success = await main();
    process.exit(!success);
  })();
}