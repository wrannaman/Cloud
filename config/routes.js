/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/'                                   : 'HomeController.index',

  // 'post /2/products/create'             : 'ProductsController.create',
  // 'get /2/products'                     : 'ProductsController.list' ,
  // 'get /2/products/edit/:id'            : 'ProductsController.edit' ,
  // 'get /2/products/update/:id'          : 'ProductsController.update',
  // 'get /2/products/new'                 : 'ProductsController.new',


  'get  /3/products'                    : 'ProductsController.all' ,
  'get  /3/products/:id'                : 'ProductsController.one' ,
  'post /3/products'                    : 'ProductsController.create',
  'put /3/products'                     : 'ProductsController.update',
  'delete /3/products/:id'              : 'ProductsController.delete',
  'post /3/upload_photo'                : 'ProductsController.upload_photo',

  'get /3/users'                        : 'UsersController.getAll',
  'get /3/users/:id'                    : 'UsersController.getOne',
  'post /3/users'                       : 'UsersController.create',
  'put /3/users'                        : 'UsersController.update',
  'delete /3/users/:id'                 : 'UsersController.delete',


};
