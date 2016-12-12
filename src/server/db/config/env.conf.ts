// ```
// env.conf.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// env.conf.js may be freely distributed under the MIT license
// ```

// *env.conf.js*

// This is the file where we will configure our Node environmental
// variables for production

// Reference : http://thewebivore.com/super-simple-environment-variables-node-js/#comment-286662

// # Node Env Variables

let config = require('../../../../config/config');

// Check each necessary node `environment variable` to see if a
// value has been set and if not, use the `config` object to
// supply appropriate values
export function validateDBEnvVariables() {

  // Set the appropriate MongoDB URI
  validateMongoUri();

  return;
}


// Set the appropriate MongoDB URI with the `config` object
// based on the value in `process.env.NODE_ENV
function validateMongoUri() {
  //console.log(process.env);
  if (!process.env.MONGO_URI) {

    console.log('No value set for MONGO_URI...');
    console.log('Using the supplied value from config object...')

    switch(process.env.NODE_ENV) {

      case 'development':

        process.env.MONGO_URI = config.MONGO_URI.DEVELOPMENT;
        console.log(`MONGO_URI set for ${process.env.NODE_ENV}`);
        break;

      case 'production':

        process.env.MONGO_URI = config.MONGO_URI.PRODUCTION;
        console.log(`MONGO_URI set for ${process.env.NODE_ENV}`);
        break;

      case 'test':

        process.env.MONGO_URI = config.MONGO_URI.TEST;
        console.log(`MONGO_URI set for ${process.env.NODE_ENV}`);
        break;

      default:

        console.log('Unexpected behavior! process.env.NODE_ENV set to ' +
          'unexpected value!');
        break;
    }
  }

  return;
}
