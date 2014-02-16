module.exports = function(grunt){
    grunt.initConfig({
        dir: {
            build : 'build',
            source: 'source'
        },

        /**
         * Load package.json
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Config for tasks
         */
        bower: {
            install: {
                options: {
                    install      : true,
                    copy         : false,
                    cleanBowerDir: false
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments    : true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= dir.build %>/index.html': '<%= dir.source %>/index.html'
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd   : '<%= dir.source %>/img/',
                    src   : ['**/*.{png,jpg,gif}'], dest: '<%= dir.build %>/img' }]
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd   : '<%= dir.source %>/_scss',
                    src   : ['**/*.scss'],
                    dest  : '<%= dir.source %>/css',
                    ext   : '.css'
                }]
            }
        },
        cssmin: {
            compress: {
                files: {
                    '<%= dir.build %>/css/app.css': [
                        '<%= dir.source %>/css/bootstrap.css',
                        '<%= dir.source %>/css/torcons.css',
                        '<%= dir.source %>/css/main.css'
                    ]
                }
            }
        },
        copy: {
            init: {
                files: [
                    { expand: true, cwd: 'bower_components/html5-mobile-boilerplate', src: '.htaccess', dest: '<%= dir.source %>', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/html5-mobile-boilerplate', src: 'index.html', dest: '<%= dir.source %>', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/html5-mobile-boilerplate', src: 'crossdomain.xml', dest: '<%= dir.source %>', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/html5-mobile-boilerplate', src: 'robots.txt', dest: '<%= dir.source %>', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/html5-mobile-boilerplate', src: 'humans.txt', dest: '<%= dir.source %>', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/html5-mobile-boilerplate', src: 'favicon.ico', dest: '<%= dir.source %>', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/html5-mobile-boilerplate/img/touch', src: '*.png', dest: '<%= dir.source %>/img/touch', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/html5-mobile-boilerplate/img/startup', src: '*.png', dest: '<%= dir.source %>/img/startup', filter: 'isFile' },
                ]
            },
            update: {
                files: [
                    { expand: true, cwd: 'bower_components/bootstrap/dist/css', src: 'bootstrap.css', dest: '<%= dir.source %>/css', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/torcons/fonts', src: '*.{eot,svg,ttf,woff}', dest: '<%= dir.source %>/fonts', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/torcons/css', src: 'torcons.css', dest: '<%= dir.source %>/css', filter: 'isFile' },
                ]
            },
            build: {
                files: [
                    { expand: true, cwd: '<%= dir.source %>', src: ['*.{ico,txt,xml,htaccess}', 'fonts/*.{eot,svg,ttf,woff}'], dest: '<%= dir.build %>', filter: 'isFile' },
                ]
            }
        },
        clean: {
            build: ['<%= dir.build %>']
        },
        connect: {
            livereload: {
                options: {
                    host: '*',
                    port: 9000,
                    base: 'build',
                    open: true
                }
            }
        },
        esteWatch: {
            options: {
                dirs: ['<%= dir.source %>/**/'],
                livereload: {
                    enabled   : true,
                    port      : 35729,
                    extensions: ['html', 'css', 'js']
                }
            },
            html: function(filepath){
                if (/\.html$/.test(filepath)) {
                    return ['htmlmin'];
                }
            },
            scss: function(filepath){
                if (/\.scss$/.test(filepath)) {
                    return ['sass', 'cssmin'];
                }
            }
        }
    });

    /**
     * Load modules
     */
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-este-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');

    /**
     * Regist tasks
     */
    grunt.registerTask('init', 'Initialized dir <%= dir.source %>', function(){
        grunt.file.mkdir('source/_scss');

        grunt.file.write('source/_scss/main.scss',
            ''
        );
        grunt.file.write('source/js/main.js',
            "require(['woothee', 'mbp', 'jquery'], function(woothee, MBP, $){\n"
            + "    'use strict';\n"
            + "\n"
            + "    var ua = woothee.parse(navigator.userAgent);\n"
            + "\n"
            + "    MBP.preventZoom();\n"
            + "\n"
            + "    $(document).ready(function(){\n"
            + "        console.log(ua);\n"
            + "    });\n"
            + "\n"
            + "});"
        );
        grunt.file.write('source/js/config.js',
            "var require = {\n"
            + "    deps: [\n"
            + "        'vendor/es5-shim.js',\n"
            + "        'vendor/woothee.js',\n"
            + "        'vendor/jquery.js',\n"
            + "        'vendor/bootstrap.js'\n"
            + "    ],\n"
            + "    paths: {\n"
            + "        'mbp': 'vendor/helper'\n"
            + "    },\n"
            + "    shim: {\n"
            + "        mbp: { exports: 'MBP' }\n"
            + "    }\n"
            + "};"
        );
        grunt.file.write('source/sitemap.xml',
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + '    <url>\n'
            + '        <loc><%= pkg.homepage %>/</loc>\n'
            + '        <lastmod>' + new Date() + '</lastmod>\n'
            + '    </url>\n'
            + '</urlset>'
        );
        grunt.task.run(['bower', 'copy:init', 'copy:update']);
    });
    grunt.registerTask('update', ['bower', 'copy:update']);
    grunt.registerTask('build', ['clean', 'htmlmin', 'imagemin', 'sass', 'cssmin', 'copy:build']);
    grunt.registerTask('server', ['build', 'connect', 'esteWatch']);
};
