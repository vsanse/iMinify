# iMinify [![Maintainability](https://api.codeclimate.com/v1/badges/ab398b1a9bcb2a2d50a7/maintainability)](https://codeclimate.com/github/vsanse/iMinify/maintainability) [![npm version](http://img.shields.io/npm/v/iminify.svg?style=flat)](https://npmjs.org/package/iminify "View this project on npm")
iMinify is image optimization utility based on [imagemin](https://www.npmjs.com/package/imagemin) package. It currently supports optimization for:
- png
- jpg/jpeg
- svg
- gif

# Usage
iMinify is simple cli utility tool.
```sh
$ npm install -g iminify
$ minify [options]
```

## Options
#### --quality or -q : 
Define quality of images[1-100].  

Type: `number`  
image Type: `jpg/jpeg, png`  
Default: `75`  

#### --progressive, -p : 
If you want progressive.[true/false]  

Type: `boolean`  
image Type: `jpg/jpeg`  
Default: `false`  

#### --speed or -s : 
Type: `number`  
Default: `1`  
image Type: `png`  
Values: `1 (brute-force) to 11 (fastest)`  

Speed 10 has 5% lower quality, but is about 8 times faster than the default. Speed 11 disables dithering and lowers compression level.

#### --optimizelevel or -ol : 
Type: `number`   
Default: `2`  
Values: `1 to 3`  
image Type: `gif`  

Select an optimization level between 1 and 3.

The optimization level determines how much optimization is done; higher levels take longer, but may have better results.

1. Stores only the changed portion of each image.  
2. Also uses transparency to shrink the file further.
3. Try several optimization methods (usually slower, sometimes better results)  

#### --interlaced or -il : 
Type: `boolean`  
Default: `true`  
Values: `true/false`  
image Type: `gif`  
Interlace gif for progressive rendering.  

#### --outputDir or -o  
Default: `Current Directory`  
Define output folder name(Default: replace files with optimized ones at same location.  

#### --inputDir or -i  
Default: `Current Directory`  
Define images folder name(Default: traverse all sub-directories in current directory).  

### Development

Want to contribute? Great!
Make a pull request now!

### Todos

 - Add optimization for video files

License
----

MIT


**Free Software, Hell Yeah!**
 
