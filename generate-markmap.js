const fs = require('fs');
const path = require('path');
const { Transformer } = require('markmap-lib');
const { pluginFrontmatter } = require('markmap-lib/plugins');
const { fillTemplate, baseJsPaths } = require('markmap-render');
const { buildJSItem } = require('markmap-common');

// Check for offline mode flag
const offlineMode = process.argv.includes('--offline');

// Read the markdown file
const markdownPath = path.join(__dirname, 'taxonomy.md');
const markdown = fs.readFileSync(markdownPath, 'utf-8');

// Create transformer with frontmatter plugin (since taxonomy.md has frontmatter)
const transformer = new Transformer([pluginFrontmatter]);

// Transform Markdown to markmap data
const { root, features, frontmatter } = transformer.transform(markdown);

// Get assets required by used features
const assets = transformer.getUsedAssets(features);

// Extract markmap options from frontmatter
const jsonOptions = frontmatter?.markmap || {};

// Prepare options for fillTemplate
const templateOptions = {
  jsonOptions: jsonOptions
};

// If offline mode, use local files instead of CDN
if (offlineMode) {
  const assetsDir = path.join(__dirname, 'assets');
  
  // Create assets directory if it doesn't exist
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  // Copy d3.min.js
  const d3Source = path.join(__dirname, 'node_modules', 'd3', 'dist', 'd3.min.js');
  const d3Dest = path.join(assetsDir, 'd3.min.js');
  if (fs.existsSync(d3Source)) {
    fs.copyFileSync(d3Source, d3Dest);
    console.log('Copied d3.min.js to assets/');
  }
  
  // Copy markmap-view
  const markmapSource = path.join(__dirname, 'node_modules', 'markmap-view', 'dist', 'browser', 'index.js');
  const markmapDest = path.join(assetsDir, 'markmap-view.js');
  if (fs.existsSync(markmapSource)) {
    fs.copyFileSync(markmapSource, markmapDest);
    console.log('Copied markmap-view.js to assets/');
  }
  
  // Use local file paths
  templateOptions.baseJs = [
    buildJSItem('./assets/d3.min.js'),
    buildJSItem('./assets/markmap-view.js')
  ];
  
  console.log('Offline mode: Using local assets');
}

// Generate HTML with frontmatter options
const html = fillTemplate(root, assets, templateOptions);

// Write HTML to file
const outputPath = path.join(__dirname, 'taxonomy.html');
fs.writeFileSync(outputPath, html, 'utf-8');

console.log(`Markmap generated successfully!`);
console.log(`Output: ${outputPath}`);
if (offlineMode) {
  console.log(`Mode: OFFLINE (all assets are local - no internet required)`);
  console.log(`Note: Make sure to keep the 'assets' folder with the HTML file`);
} else {
  console.log(`Mode: ONLINE (requires internet connection for CDN resources)`);
  console.log(`Tip: Use 'npm run generate-markmap -- --offline' for offline version`);
}
console.log(`Open ${outputPath} in your browser to view the mindmap.`);

