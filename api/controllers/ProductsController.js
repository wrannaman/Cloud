/**
 * ProductsController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		create: function(req,res,next) {
			console.log('create', req.body);

			console.log('type', typeof(req.body.season));
			try {
				Products.create({
					name       : req.body.name,
					cost       : req.body.cost,
					quantity   : req.body.quantity,
					startDate  : new Date(req.body.startDate || ""),
					color      : req.body.color,
					gender     : req.body.gender,
					season     : typeof(req.body.season) === 'string' ? [req.body.season] : req.body.season
				}).then(function(created){
					//console.log('created');
					if (created) return res.json({success: true, error: false});
					else return res.json({error: "New product not created", success: false})

				})
				.catch(function(err){
					res.json({err: err})
				})
			}
			catch(e) {
				return res.json({err: e});
			}

			console.log('ok');

		},
		list: function(req,res,next){
			Products.find().then(function(products){
				//console.log('products', products);
				res.view('products/products', {
					data: "this is a piece of data",
					products: products
				})
			})
			.catch(function(err){
				//console.log('err', err);
				res.view('products/products', {})
			})

		},
		edit: function(req,res,next){
			//console.log('req parms', req.param('id'));
			Products.findOne({id: req.param('id') }).then(function(product){
				//console.log('products', product);
				res.view('products/edit', {
					product: product
				})
			})
			.catch(function(err){
				//console.log('err', err);
				res.view('products/edit', {})
			})
		},
		update: function(req,res,next){
			console.log('update req parms', req.param('id'));
			console.log('req body', req.body);
			Products
			.update({id: req.param('id')}, {name: req.body.name, cost: req.body.cost, quantity: req.body.quantity, color: req.body.color})
			.then(function(product){
				console.log('products', product);
				res.json({
					product: product,
					success: true,
					error  : null,
				})
			})
			.catch(function(err){
				console.log('err', err);
				res.json({
					error: "error" + err,
				})
			})
		},
		new: function(req,res,next){
			res.view('products/new',{})
		}
};
