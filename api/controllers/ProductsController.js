/**
 * ProductsController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		create: function(req,res,next) {
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
			Products
			.update({id: req.param('id')}, {name: req.body.name, cost: req.body.cost, quantity: req.body.quantity, color: req.body.color})
			.then(function(product){
				res.json({
					product: product,
					success: true,
					error  : null,
				})
			})
			.catch(function(err){
				res.json({ err: err })
			})
		},
		new: function(req,res,next){
			res.view('products/new',{})
		}
};
