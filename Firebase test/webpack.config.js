const path = require('path')



module.exports = {
    mode: 'development', // This specification can be changed
    entry: './src/index.js', // This is a path to it 
    output: {
    path: path.resolve(__dirname, 'dist'), // Path of the output file 
    filename: 'bundle.js'
    },
    watch: true
    

}