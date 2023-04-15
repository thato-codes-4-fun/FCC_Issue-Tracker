const mongoose = require('mongoose')

const connect = async (uri) => {
  try {
    console.log('connecting....')
     return await mongoose.connect(uri);
  } catch(e){
    console.log('error: ', e)
    return e.message;
  }
}

module.exports = connect

