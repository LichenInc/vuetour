module.exports = {
    files: {
        javascripts: {
            joinTo: {
              'js/app.js': /^app/,
              'js/vendor.js': /^node_modules/
            }
        },
        templates: {
            joinTo: 'app.js'
        }
    },
    plugins: {
        babel: {
            presets: ['es2015']
        }
    },
    npm: {
      static: ['snabbt.js']
    }
};
