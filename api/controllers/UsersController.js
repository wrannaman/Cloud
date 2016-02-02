/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var Promise = require('bluebird');

module.exports = {
	create: function(req,res,next) {
		var error = [];
		if (typeof(req.body.firstName) === 'undefined') error.push("field 'firstName' not provided.");
		if (typeof(req.body.lastName) === 'undefined') error.push("field 'lastName' not provided.");
		if (typeof(req.body.email) === 'undefined') error.push("field 'email' not provided.");
		if (typeof(req.body.password) === 'undefined') error.push("field 'password' not provided.");
		if (typeof(req.body.firstName) !== 'undefined'&& req.body.firstName.length === 0) error.push("field 'firstName' cannot be blank.");
		if (typeof(req.body.lastName) !== 'undefined'&& req.body.lastName.length === 0) error.push("field 'lastName' cannot be blank.");
		if (typeof(req.body.email) !== 'undefined' && req.body.email.length === 0) error.push("field 'email' cannot be blank.");
		if (typeof(req.body.password) !== 'undefined' && req.body.password.length === 0) error.push("field 'password' cannot be blank.");
		if (error.length > 0 ) return res.json({error: error});

		// firstName  : { type: "string" },
		// lastName   : { type: "string" },
		// email      : { type: "string", unique: true },
		// password   : { type: "string", required: true },

		try {
			// create
			Users.findOne({email: req.body.email})
			.then(function(user){
				if ( user ) return res.json({error: ["another user is already registered with this email address"]});
				Users.create({
					firstName      : req.body.firstName,
					lastName       : req.body.lastName,
					email  	 			 : req.body.email,
					password     	 : req.body.password
				}).then(function(created){
					if (created) return res.json({user: created, error: []});
					else return res.json({error: ["New user not created"] })
				})
				.catch(function(err){
					res.json({err: [err]})
				})
			})

		}
		catch(e) {
			// catch error
			console.log('e', e);
			return res.json({error: [e]});
		}

	},
	getOne: function(req,res,next){
		var id = req.param('id');
		console.log('id', id);
		if (typeof(id) === 'undefined' ) return res.json({error:["id parameter required"]});
		Users.findOne({id: id})
		.then(function(user){
			if( !user ) return res.json({error: ["user not found"]})
			res.json({user: user, error: []})
		})
		.catch(function(err){
			return res.json({error: [err]});
		})

	},
	getAll : function(req,res,next){
		Users.find()
		.then(function(users){
			return res.json({users: users, error: []})
		})
	},

	update: function(req,res,next){
		console.log('update', req.body);
		var error = [];
		if (typeof(req.body.id) === 'undefined') error.push("field 'id' not provided.");
		if (typeof(req.body.firstName) === 'undefined') error.push("field 'firstName' not provided.");
		if (typeof(req.body.lastName) === 'undefined') error.push("field 'lastName' not provided.");
		if (typeof(req.body.email) === 'undefined') error.push("field 'email' not provided.");
		if (typeof(req.body.password) === 'undefined') error.push("field 'password' not provided.");
		if (typeof(req.body.firstName) !== 'undefined'&& req.body.firstName.length === 0) error.push("field 'firstName' cannot be blank.");
		if (typeof(req.body.lastName) !== 'undefined'&& req.body.lastName.length === 0) error.push("field 'lastName' cannot be blank.");
		if (typeof(req.body.email) !== 'undefined' && req.body.email.length === 0) error.push("field 'email' cannot be blank.");
		if (typeof(req.body.password) !== 'undefined' && req.body.password.length === 0) error.push("field 'password' cannot be blank.");
		if (error.length > 0 ) return res.json({error: error});

		// firstName  : { type: "string" },
		// lastName   : { type: "string" },
		// email      : { type: "string", unique: true },
		// password   : { type: "string", required: true },

		try {
			// create
			Users.findOne({id: req.body.id})
			.then(function(user){
				if ( !user ) return res.json({error: ["User not found."]});
			    Users.findOne({email: req.body.email})
          .then(function(emailUser){
            if (typeof(emailUser) !== 'undefined' && emailUser !== 'undefined' && emailUser.id !== user.id) return res.json({error: ["This email address is in use by another user."]})
            Users.update({id: req.body.id},{
              firstName      : req.body.firstName,
              lastName       : req.body.lastName,
              email  	 			 : req.body.email,
              password     	 : req.body.password
            }).then(function(created){
              if (created) return res.json({user: created, error: []});
              else return res.json({error: ["New user not created"] })
            })
            .catch(function(err){
              console.log('err', err);
              res.json({error: [err]})
            })
          })
			});

		}
		catch(e) {
			// catch error
			console.log('e', e);
			return res.json({error: [e]});
		}
	},
	delete: function(req,res,next){
		console.log('delete');
		var id = req.param('id');
		if ( typeof(id) === 'undefined' || !id ) return res.json({error: ["user id must be provided"]})
		Users.findOne({id: id})
		.then(function(user){
			console.log('user', user);
			if ( !user ) return res.json({error: ["User not found"]});
			Users.destroy({id: user.id})
			.then(function(deletedUser){
				// delete all products associated with user.
				Products.find({user: user.id})
				.then(function(products){
					console.log('products', products);
					var _Products = Promise.promisifyAll(Products);

					return Promise.map(products, function(prod){

						console.log('prod id', prod.id);
						return _Products.destroyAsync({id: prod.id})
						.then(function(foundProd){
							console.log('foundProd', foundProd.id);
							return prod.id;
						})
					})
					.then(function(deleted){

						console.log('deleted', deleted);
						return res.json({errors: [], deletedUser: deletedUser, deletedProducts: deleted})

					})
				})
				.catch(function(err){
					return res.json({error: [err]});
				})

			})
			.catch(function(err){
				return res.json({error: [err]})
			})
			console.log('user', user);
		})
		.catch(function(err){
			return res.json({error: [err]})
		})

	}

};
