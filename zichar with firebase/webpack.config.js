const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    signup:['./src/signup_page/signup.js'],
    index:['./src/index_page/firebase.js'],
    login:['./src/login_page/login.js'],
    landing_page:['./src/landing_page/landing_page.js']
},
  output: {
    
    filename: '[name].bundle.js',
    path: `${__dirname}/dist`,
    // clean: true
  },
  watch: true
}