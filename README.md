# iMinify [![Maintainability](https://api.codeclimate.com/v1/badges/ab398b1a9bcb2a2d50a7/maintainability)](https://codeclimate.com/github/vsanse/iMinify/maintainability) [![npm version](http://img.shields.io/npm/v/iminify.svg?style=flat)](https://npmjs.org/package/iminify "View this project on npm")

![iMinify](https://i.imgur.com/UhrQxCe.png)

iMinify is image optimization utility based on [imagemin](https://www.npmjs.com/package/imagemin) package. It currently supports optimization for:
- png
- jpg/jpeg
- svg
- ~~gif~~  
```diff
- GIF support delayed till issues are resolved ==> https://github.com/imagemin/gifsicle-bin/issues/104 & https://github.com/kohler/gifsicle/issues/137
```

# Usage
iMinify is simple cli utility tool.
```sh
$ npm install -g iminify
$ minify [options]
```

## Options
#### --minify or -m : 
Make this false if you don't want image optimization.e.g- create only webp images without minification
e.g: `minify -m false -w true -q 60`

Type: `boolean`  
Default: `true`  

#### --webp or -w : 
Make this true if you want to create webp images
e.g: `minify -w true -q 60`

Type: `boolean`  
Default: `false` 

#### --quality or -q : 
Define quality of images[1-100].  

Type: `number`  
image Type: `jpg/jpeg, png`  
Default: `100` 

#### --alphaQuality or --aq : 
Define alphaQuality of PNG images. Required for webp Conversion[1-100].  

Type: `number`  
image Type: `png`  
Default: `100`  

#### --progressive, -p : 
If you want progressive.[true/false]  

Type: `boolean`  
image Type: `jpg/jpeg`  
Default: `true`  

#### --speed or -s : 
Type: `number`  
Default: `1`  
image Type: `png`  
Values: `1 (brute-force) to 11 (fastest)`  

Speed 10 has 5% lower quality, but is about 8 times faster than the default. Speed 11 disables dithering and lowers compression level.

#### --optimizelevel or --ol : 
Type: `number`   
Default: `2`  
Values: `1 to 3`  
image Type: `gif`  

Select an optimization level between 1 and 3.

The optimization level determines how much optimization is done; higher levels take longer, but may have better results.

1. Stores only the changed portion of each image.  
2. Also uses transparency to shrink the file further.
3. Try several optimization methods (usually slower, sometimes better results)  

#### --interlaced or --il : 
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

### FAQ & Issues:
##### Q: It doesn't get installed globally using npm install -g iminify on windows
###### Ans: Do this:
1. `git clone https://github.com/vsanse/iminify`
2. `cd iminify`
3. `npm install`
4. `npm install -g`

#### or
`git clone https://github.com/vsanse/iminify && cd iminify && npm install && npm install -g`

##### Q: Getting permission error using `sudo npm install -g iminify` on ubuntu/Linux/Mac
###### Ans: use `sudo npm install -g iminify --unsafe-perm=true --allow-root`

License
----

MIT


**Free Software, Hell Yeah!**
 
