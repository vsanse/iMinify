#!/usr/bin/env node
const fs = require("fs"),
      path = require("path"),
      yargs = require('yargs'),
      chalk = require("chalk"),
      figlet = require("figlet"),
      clear = require("clear"),
      confirm = require('prompt-confirm'),
      imgEngines   = require('./engine'), 
      CURR_DIR = process.cwd(),
      engines  = new imgEngines(CURR_DIR);
      
clear();
console.log(
    chalk.bold.yellow(
        figlet.textSync("iMinify", { horizontalLayout: "full" })
    )
);

const argv = yargs
    .scriptName('minify')
    .usage('Usage: $0 [options]')
    .option('quality', {
        alias: 'q',
        description: 'Define quality of images[1-100](Default:75)',
        type: 'number'
    })
    .option('alphaQuality', {
        alias: 'aq',
        description: 'Define alphaQuality of PNG images. Required for webp Conversion[1-100](Default:75)',
        type: 'number'
    })
    .option('progressive', {
        alias: 'p',
        description: 'If want progressive Jpeg (Default:false)',
        type: 'boolean'
    })
    .option('speed', {
        alias: 's',
        description: 'Handles dithering and compression level(png)[1-11](Default:1)',
        type: 'number'
    })
    .option('optimizeLevel', {
        alias: 'ol',
        description: 'Select an optimization level between 1 and 3[gif].The optimization level determines how much optimization is done; higher levels take longer, but may have better results.(Default:2)',
        type: 'number'
    })
    .option('interlaced', {
        alias: 'il',
        description: 'Interlace gif for progressive rendering[gif].(Default:true)',
        type: 'boolean'
    })
    .option('outputDir', {
        alias: 'o',
        description: 'Define output folder name(Default: replace files with optimized ones at same location)',
        type: 'string'
    })
    .option('inputDir', {
        alias: 'i',
        description: 'Define images folder name(Default: traverse all sub-directories in current directory)',
        type: 'string'
    })
    .option('webp',{
        alias: 'w',
        description: 'create webp image from your PNG/JPG image. Default: false',
        type: 'boolean'
    })
    .option('minify',{
        alias: 'm',
        description: "Make this false if you don't want image optimization.e.g- create only webp images without minification: Default: true",
        type: 'boolean'
    })
    .help()
    .alias('help', 'h')
    .argv;

const outputDir = argv.outputDir,
      inputDir = argv.inputDir,
      inputPath = inputDir?path.join(CURR_DIR, inputDir): CURR_DIR,
      quality  = argv.quality?argv.quality:75,
      progressive = (typeof(argv.progressive)==="undefined" || argv.progressive === true) ?true:false,
      speed = argv.speed?argv.speed:1,
      optimizeLevel = argv.optimizeLevel?argv.optimizeLevel:2,
      interlaced = (typeof(argv.interlaced)==="undefined" || argv.interlaced === true) ?true:false,
      webp = argv.webp?argv.webp:false,
      minify =(typeof(argv.minify)==="undefined" || argv.minify === true) ?true:false,
      alphaQuality = argv.alphaQuality?argv.alphaQuality:75;

function walk(dir, outputPath){
    const filesToWalk = fs.readdirSync(dir);
    // Run optimization engines on directory
    if(minify){
        engines.optimizejpg(dir, outputPath, quality, progressive);
        engines.optimizepng(dir, outputPath, quality, speed);
        engines.optimizegif(dir, outputPath, interlaced, optimizeLevel);
        engines.optimizesvg(dir,outputPath);
    }
    if(webp){
        engines.createwebp(dir, outputPath, quality, alphaQuality);  
    }
    // get next directory
    filesToWalk.forEach(file => {
        const origFilePath = path.join(dir, file);
        // get stats about the current file
        const stats = fs.statSync(origFilePath);
        if (stats.isDirectory()) {
            if(outputDir){
                let filePath = path.join(dir, file).split(inputPath)[1];
                outputPath = path.join(CURR_DIR, outputDir, filePath);
            }
            else{
                outputPath = path.join(dir, file);
            }
            // recursive call
            walk(
                path.join(dir, file),
                outputPath
            );
        }
    });
}

function start(){
    if(inputDir){
        walk(
            inputPath,
            outputDir?path.join(CURR_DIR, outputDir,inputDir):path.join(CURR_DIR, inputDir)
        );
    }
    else{
        walk(
            inputPath,
            outputDir?path.join(CURR_DIR, outputDir):CURR_DIR
        );
    }
}

if(!outputDir){
    console.log(chalk.bold.red("This will replace current images with minified/optimized images."));
    const prompt = new confirm(chalk.red("Continue?"));
    prompt.originalDefault = false;
    prompt.run()
    .then(function(answer) {
        if(answer){
            start();
        }
        else{
            yargs.showHelp();
        }
    }); 
}
else{
    start();
}