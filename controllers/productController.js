const mongoose =require('mongoose');
const { ProductSchema } =require('../models/productModel');

const Product = mongoose.model('Products', ProductSchema);

exports.addNewProduct = (req, res, next) => {
  let newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
    product_sku: req.body.productSKU,
    product_title: req.body.productTitle,
    product_description: req.body.productDescription,
    manufacture_details:{model_number:req.body.manufactureDetails.modelNumber,
        release_date:req.body.manufactureDetails.releaseDate},
    primary_category_id: req.body.primaryCategoryId,
    category_ids:req.body.categoryId,
    tags:req.body.tag,
    created_at: new Date(),
  });
  newProduct.save((err, newProduct) => {
    if (err) {
      res.send(err);
    }
    res.json(newProduct);
  });
};

exports.getProductById = (req, res, next) => {
    const productId=req.query.productId;
  if (productId) {
    Product.find({ _id: productId })
      .then((variation) => {
        res.json(variation);
      })
      .catch((err) => res.send(err));
  } else {
    next();
  }
};
exports.fetchProducts = async (req, res) => {
    try {

        let sort = {}
        if(req.query.sort) {
            sort[req.query.sort] = req.query.asc ? 1 :-1 
        }

        let query = {}

        if(req.query.filter) {
            let filter = JSON.parse(req.query.filter);
            
            query = pick(filter, ['product_sku', 'product_title', 'product_description']) 
            
        }
        
        const options = {
            sort: Object.values(sort).length > 0 ? sort: {
                'created_at': -1
            },
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            populate: { path: 'Categories'}
        }
        const Products = await Product.paginate(query,options)

        res.json(Products)

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
};
exports.editProduct = (req, res) => {
    Product.findById(req.query.productId, function (err, variation) {
    if (!variation) {
      return next(new Error('Could not load Document'));
    } else {
        product.updatedDate = new Date();
        product.product_sku= req.body.productSKU;
        product.product_title= req.body.productTitle,
        product.product_description= req.body.productDescription,
        product.manufacture_details={model_number:req.body.manufactureDetails.modelNumber,
            release_date:req.body.manufactureDetails.releaseDate},
        product.primary_category_id= req.body.primaryCategoryId,
        product.category_ids=req.body.categoryId,
        product.tags=req.body.tag,
        product.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json(product);
        }
      });
    }
  });
};
exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.query.productId })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.send(err));
};
