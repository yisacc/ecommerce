const mongoose =require('mongoose');
const { ProductVarietySchema } =require('../models/productVarietyModel');

const ProductVariety = mongoose.model('ProductVarieties', ProductVarietySchema);

exports.addNewProductVariety = (req, res, next) => {
  let newProductVariety = new ProductVariety({
    _id: new mongoose.Types.ObjectId(),
    option_id: req.body.optionId,
    product_id: req.body.productId,
    total_stock: req.body.totalStock,
    shipping_details:{ weight: req.body.shippingDetails.weight,
    width: req.body.shippingDetails.width,
    height: req.body.shippingDetails.height,
    depth: req.body.shippingDetails.depth},
    price_history:[{
      retail:req.body.priceHistory[0].retail,
      sale:req.body.priceHistory[0].sale,
      start:req.body.priceHistory[0].start,
      end:req.body.priceHistory[0].end
  }],
    created_at: new Date(),
  });
  newProductVariety.save((err, newProductVariety) => {
    if (err) {
      res.send(err);
    }
    res.json(newProductVariety);
  });
};

exports.getProductVarietyById = (req, res, next) => {
    const productVarietyId=req.query.productVarietyId;
  if (productVarietyId) {
    ProductVariety.find({ _id: productVarietyId })
      .then((variation) => {
        res.json(variation);
      })
      .catch((err) => res.send(err));
  } else {
    next();
  }
};
exports.fetchProductVarieties = async (req, res) => {
    try {

        let sort = {}
        if(req.query.sort) {
            sort[req.query.sort] = req.query.asc ? 1 :-1 
        }

        let query = {}

        if(req.query.filter) {
            let filter = JSON.parse(req.query.filter);
            
            query = pick(filter, ['option_id', 'product_id', 'total_stock']) 
            
        }
        
        const options = {
            sort: Object.values(sort).length > 0 ? sort: {
                'price_history.sale': -1
            },
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            populate: { path: 'Categories'}
        }
        const ProductVarieties  = await ProductVariety.paginate(query,options)

        res.json(ProductVarieties)

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
};
exports.editProductVariety = (req, res) => {
  ProductVariety.findById(req.query.productVarietyId, function (err, productVariety) {
    if (!productVariety) {
      return next(new Error('Could not load Document'));
    } else {
      productVariety.updatedDate = new Date();
      productVariety.product_sku= req.body.productSKU;
      productVariety.product_title= req.body.productTitle,
      productVariety.total_stock=req.body.totalStock,
      productVariety.product_description= req.body.productDescription,
      productVariety.shipping_details={ weight: req.body.shippingDetails.weight,
        width: req.body.shippingDetails.width,
        height: req.body.shippingDetails.height,
        depth: req.body.shippingDetails.depth},
        product.price_history=[{
          retail:req.body.priceHistory[0].retail,
          sale:req.body.priceHistory[0].sale,
          start:req.body.priceHistory[0].start,
          end:req.body.priceHistory[0].end
      }],
        
        
        product.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json(productVariety);
        }
      });
    }
  });
};
exports.deleteProductVariety = (req, res) => {
  ProductVariety.deleteOne({ _id: req.query.productVarietyId })
    .then((productVariety) => {
      res.json(productVariety);
    })
    .catch((err) => res.send(err));
};
