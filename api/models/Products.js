/**
* Products.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name         : { type: "string"},
    cost         : { type: "float"},
    quantity     : { type: "integer", min: 0},
    startDate    : { type: "datetime", defaultsTo: new Date()},
    gender       : { type: "string", enum: ['male', 'female', 'both'] },
    season       : { type: "array"},
    user         : { model: "users", required: true},
  }
};
