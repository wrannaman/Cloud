/**
 * ProductsController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 // 'get  /3/products'                    : 'ProductsController.all' ,
 // 'get  /3/products/:user_id'           : 'ProductsController.one' ,
 // 'post /3/products'                    : 'ProductsController.create',
 // 'put /3/products/update'              : 'ProductsController.update',
 // 'delete /3/products/delete'           : 'ProductsController.delete',

module.exports = {
		create: function(req,res,next) {

			var error = [];
			if (typeof(req.body.name) === 'undefined') error.push("field 'name' not provided.");
			if (typeof(req.body.cost) === 'undefined') error.push("field 'cost' not provided.");
			if (typeof(req.body.quantity) === 'undefined') error.push("field 'quantity' not provided.");
			//if (typeof(req.body.color) === 'undefined') error.push("field 'color' not provided.");
			if (typeof(req.body.gender) === 'undefined') error.push("field 'gender' not provided.");
			if (typeof(req.body.season) === 'undefined') error.push("field 'season' not provided.");
			if (typeof(req.body.user) === 'undefined') error.push("field 'user' not provided.");

			if (typeof(req.body.name) !== 'undefined'&& req.body.name.length === 0) error.push("field 'name' cannot be blank.");
			if (typeof(req.body.cost) !== 'undefined'&& req.body.cost.length === 0) error.push("field 'cost' cannot be blank.");
			if (typeof(req.body.quantity) !== 'undefined' && req.body.quantity.length === 0) error.push("field 'quantity' cannot be blank.");
			//if (typeof(req.body.color) !== 'undefined' && req.body.color.length === 0) error.push("field 'color' cannot be blank.");
			if (typeof(req.body.gender) !== 'undefined' && req.body.gender.length === 0) error.push("field 'gender' cannot be blank.");
			if (typeof(req.body.season) !== 'undefined' && req.body.season.length === 0) error.push("field 'season' cannot be blank.");
			if (typeof(req.body.user) !== 'undefined' && req.body.user.length === 0) error.push("field 'user' cannot be blank.");

			if (error.length > 0 ) return res.json({error: error});

			Products.findOne({user: req.body.user, name: req.body.name})
			.then(function(foundItem){
				if(foundItem) return res.json({error: ["This user already has a product with that name"]})
				try {
					Products.create({
						name       : req.body.name,
						cost       : req.body.cost,
						quantity   : req.body.quantity,
						startDate  : new Date(typeof(req.body.startDate) !== 'undefined' ?  req.body.startDate : null),
						color      : req.body.color || null,
						gender     : req.body.gender,
						season     : typeof(req.body.season) === 'string' ? [req.body.season] : req.body.season,
						user 			 : req.body.user,
					}).then(function(created){
						if (created) return res.json({product: created, error: []});
						else return res.json({error: ["New product not created"]})
					})
					.catch(function(err){
						res.json({err: err})
					})
				}
				catch(e) {
					return res.json({err: e});
				}

			})
			.catch(function(err){
				return res.json({error:[err]})
			})

		},
		all: function(req,res,next){

			Products.find()
			.populate('user')
			.then(function(p){
				res.json({products: p})
			})
		},
		one: function(req,res,next){
			var id = req.param('id');
			console.log('one id', id);

			Products.findOne({id: id})
			.then(function(prod){
				console.log('one', prod );
				return res.json({products: prod, error: []})
			})
			.catch(function(err){
				console.log('error, err', err);
				return res.json({error: [err]})
			})
		},
		allUser: function( req, res, next){
			var id = req.param('id');
			console.log('all user id', id);
			Products.find({user: id})
			.then(function(prod){
				console.log('one', prod );
				return res.json({products: prod, error: []})
			})
			.catch(function(err){
				console.log('error, err', err);
				return res.json({error: [err]})
			})
		},
		delete: function(req,res,next){
			var id = req.param('id');
			if ( typeof(id) === 'undefined' || !id ) return res.json({error: ["product id must be provided"]})

			Products.findOne({id: id})
			.then(function(product){
				if ( !product ) return res.json({error: ["Product not found"]});
				Products.destroy({id: product.id})
				.then(function(deleted){
					return res.json({error: [], deleted: deleted})
				})
				.catch(function(err){
					return res.json({error: [err]})
				})
			})
			.catch(function(err){
				return res.json({error: [err]})
			})
		},
		list: function(req,res,next){
			Products.find().then(function(products){
				res.view('products/products', {
					data: "this is a piece of data",
					products: products
				})
			})
			.catch(function(err){
				res.view('products/products', {})
			})

		},
		edit: function(req,res,next){
			Products.findOne({id: req.param('id') }).then(function(product){
				res.view('products/edit', {
					product: product
				})
			})
			.catch(function(err){
				res.view('products/edit', {})
			})
		},
		update: function(req,res,next){
			var error = [];
			console.log('update', req.body);

			if (typeof(req.body.id) === 'undefined') error.push("field 'id' not provided.");

			if (typeof(req.body.name) === 'undefined') error.push("field 'name' not provided.");
			if (typeof(req.body.cost) === 'undefined') error.push("field 'cost' not provided.");
			if (typeof(req.body.quantity) === 'undefined') error.push("field 'quantity' not provided.");
			if (typeof(req.body.color) === 'undefined') error.push("field 'color' not provided.");
			if (typeof(req.body.gender) === 'undefined') error.push("field 'gender' not provided.");
			if (typeof(req.body.season) === 'undefined') error.push("field 'season' not provided.");
			if (typeof(req.body.user) === 'undefined') error.push("field 'user' not provided.");

			if (typeof(req.body.name) !== 'undefined'&& req.body.name.length === 0) error.push("field 'name' cannot be blank.");
			if (typeof(req.body.cost) !== 'undefined'&& req.body.cost.length === 0) error.push("field 'cost' cannot be blank.");
			if (typeof(req.body.quantity) !== 'undefined' && req.body.quantity.length === 0) error.push("field 'quantity' cannot be blank.");
			if (typeof(req.body.color) !== 'undefined' &&  req.body.color && req.body.color.length === 0) error.push("field 'color' cannot be blank.");
			if (typeof(req.body.gender) !== 'undefined' && req.body.gender.length === 0) error.push("field 'gender' cannot be blank.");
			//if (typeof(req.body.season) !== 'undefined' && req.body.season.length === 0) error.push("field 'season' cannot be blank.");
			if (typeof(req.body.user) !== 'undefined' && req.body.user.length === 0) error.push("field 'user' cannot be blank.");
			if (error.length > 0) return res.json({error: error});

			Products.findOne({id: req.body.id})
			.then(function(product){
				if(!product) return res.json({error: ["product not found"]});
				Products.findOne({user: req.body.user, name: req.body.name})
				.then(function(foundItem){
					if(foundItem && foundItem.id != req.body.id) return res.json({error: ["This user already has a product with that name"]})
					console.log('ok');
					var photo = typeof(foundItem) !== 'undefined' && typeof(foundItem.photo) !== 'undefined' && foundItem.photo ? foundItem.photo : null;
					console.log('photos', photo);
					console.log('photo test', typeof(req.body.photo) !== 'undefined' ? req.body.photo : photo);
					Products.update({id: req.body.id}, {
						name: req.body.name,
						cost: req.body.cost,
						quantity: req.body.quantity,
						color: req.body.color,
						gender: req.body.gender,
						season: req.body.season,
						user: req.body.user,
						photo: req.body.photo ? req.body.photo : photo
					})
					.then(function(product){
						if(!product) return res.json({error: ["product not updated"]});

						res.json({
							product: product,
							error  : [],
						});
					})
					.catch(function(err){
						res.json({ err: err });
					})
				})
				.catch(function(err){
					return res.json({error: err});
				})

			})
			.catch(function(err){
				return res.json({error: [err]});
			})
		},
		new: function(req,res,next){
			res.view('products/new',{})
		},
		upload_photo: function(req,res,next) {
			var fs = require('fs');
			var mkdirp = require('mkdirp');
			var rimraf = require('rimraf');
			var base64 = require('base64Image');
			var name =  new Date().getTime();
			console.log('name', name);
			var options = {filename: name, localFile: true, filePath: 'assets/images/' };
			var imageData = new Buffer(req.body.img, 'base64');

			base64.base64decoder(imageData, options, function (err, saved) {
				console.log('b64', err, saved);

				return res.json({
						image: 'images/' + name + '.jpg'
				}); // res json

			}); // base 64 decoder
		}


};
