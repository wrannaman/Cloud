/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function( req, res, next ) {
    console.log('index ctrl');
    res.view({
      test: true
    })
  }

};
