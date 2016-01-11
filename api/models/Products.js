/**
* Products.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name       : { type: "string", unique: true,}, 
    cost       : { type: "float"},
    quantity   : { type: "integer"},
    startDate  : { type: "date"},
    color      : { type: "string"},
    gender     : { type: "string"},
    season     : { type: "array"},
  }
};
