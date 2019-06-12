const imagemin = require("imagemin"),
    imageMozJpeg = require("imagemin-mozjpeg"),
    imagePngQuant = require("imagemin-pngquant"),
    imageminGifsicle = require("imagemin-gifsicle"),
    imageminSvgo = require("imagemin-svgo"),
    webp = require("imagemin-webp"),
    chalk = require("chalk");

class engine {
    constructor(CURR_DIR) {
        this.CURR_DIR = CURR_DIR;
    }
    optimizejpg(imgpath, outputPath, imgQuality, isProgressive) {
        imagemin([`${imgpath}/*.jpg`, `${imgpath}/*.jpeg`], outputPath, {
            use: [
                imageMozJpeg({
                    quality: imgQuality,
                    progressive: isProgressive
                })
            ]
        }).then(() => {
            console.log(
                chalk.yellow("Images(.jpg) optimized:for dir:", imgpath)
            );
        });
    }
    optimizepng(imgpath, outputPath, imgQuality, imgspeed) {
        imagemin([`${imgpath}/*.png`], outputPath, {
            use: [
                imagePngQuant({
                    speed: imgspeed,
                    quality: [0.01 * imgQuality, 0.8]
                })
            ]
        }).then(() => {
            console.log(
                chalk.green("Images(.png) optimized:for dir:", imgpath)
            );
        });
    }
    optimizegif(imgpath, outputPath, imginterlaced, optilevel) {
        imagemin([`${imgpath}/*.gif`], outputPath, {
            use: [
                imageminGifsicle({
                    interlaced: imginterlaced,
                    optimizationLevel: optilevel
                })
            ]
        }).then(() => {
            console.log(
                chalk.magenta("Images(.gif) optimized:for dir:", imgpath)
            );
        });
    }
    optimizesvg(imgpath, outputPath) {
        imagemin([`${imgpath}/*.svg`], outputPath, {
            use: [
                imageminSvgo({
                    plugins: [{ removeViewBox: false }]
                })
            ]
        }).then(() => {
            console.log(chalk.blue("Images(.svg) optimized:for dir:", imgpath));
        });
    }
    createwebp(imgpath, outputPath, imgQuality) {
        imagemin([`${imgpath}/*.png`], outputPath, {
            plugins: [
                webp({
                    lossless: false, // Losslessly encode images
                    alphaQuality: 40
                })
            ]
        });

        imagemin([`${imgpath}/*.jpg`, `${imgpath}/*.jpeg`], outputPath, {
            plugins: [
                webp({
                    quality: imgQuality // Quality setting from 0 to 100
                })
            ]
        });
    }
}

module.exports = engine;
