module.exports = {

  friendlyName: 'Check if Website exists',
  description: 'Detects if a website with a given name exists in the currently selected account',
  extendedDescription: '',

  inputs: {
    name: {
      description: 'The name of the website that will be checked for.',
      example: 'mywebsitename',
      required: true
    }
  },

  defaultExit: 'success',
  exits: { 
    error: { 
      description: 'Unexpected error occurred.' 
    },
    success: { 
      description: 'Done.' 
    } 
  },

  fn: function (inputs,exits) {

    var child_process = require('child_process');
    var readline = require('readline');
    var cliPath = require('path').resolve(__dirname, '../node_modules/azure-cli/bin/azure');
    var _ = require('lodash');

    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    var command;

    command = 'node ' + cliPath + ' site list ';
    child_process.exec(command, function (err, stdout) {

      if(err){
        return exits.error(err);
      }

      var listedSites = JSON.parse(stdout);
      var search = _.findWhere(results, {'name': inputs.name})

      if(search){
        return exits.success(true);
      }
      else{
        return exits.success(false);
      }
    });
  },
};
