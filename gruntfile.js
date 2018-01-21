module.exports = function(grunt){
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

     uglify: {
      options: {
        mangle: true
      },
      build: {
        src: "js/dev.js",
        dest: "js/prod-min.js"
      }
    }
    });
    grunt.loadNpmTasks("grunt-contrib-uglify");
};