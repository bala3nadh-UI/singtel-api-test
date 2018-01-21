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
      },
      cssmin: { // minifying css task
        dist: {
          files: {
            'cssStyles/styles.min.css': 'cssStyles/styles.css'
          }
        }
      },
      compass: {
          dist: {
              options: {
                  sassDir: 'sassStyles',
                  cssDir: 'sassStyles',
                  environment: 'development',
                  outputStyle: 'compressed'
              }
          }
      }
    });
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.registerTask('default', ['sass', 'cssmin', 'compass']);

};