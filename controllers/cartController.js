const mongoose =require('mongoose');
const { CartSchema } =require('../models/cartModel');
const { ProductVarietySchema } =require('../models/productVarietyModel');

const Cart = mongoose.model('Cart', CartSchema);
const ProductVariety = mongoose.model('ProductVarieties', ProductVarietySchema);

exports.addToCart = (req, res, next) => {
    ProductVariety.findById(req.body.ProductVarietyId, function (err, productVariety) {
        if (!productVariety) {
          return next(new Error('Could not load Document'));
        } else if(productVariety.total_stock < req.body.totalStock) {
            return next(new Error('We do not have the requested amount'));
        }else{
          productVariety.updatedDate = new Date();
          productVariety.total_stock=productVariety.total_stock-req.body.quantity,
            
            
          productVariety.save(function (err) {
            if (err) {
              res.send(err);
            } else {
                let newCart = new Cart({
                    _id: new mongoose.Types.ObjectId(),
                    quantity: req.body.quantity,
                    Product_variety_id: req.body.ProductVarietyId,
                    user_id: req.body.userId,
                    created_at: new Date(),
                  });
                  newCart.save((err, newCart) => {
                    if (err) {
                      res.send(err);
                    }
                    res.json(newCart);
                  });
            }
          });
          
        }
      });
    

};

exports.getItemFromCartById = (req, res, next) => {
    const cartItemId=req.query.cartItemId;
  if (cartItemId) {
    Cart.find({ _id: cartItemId })
      .then((Cart) => {
        res.json(Cart);
      })
      .catch((err) => res.send(err));
  } else {
    next();
  }
};
exports.fetchCartItems = async (req, res) => {
 

    Cart.find()
    .then((cartItems) => {
      res.json(cartItems);
    })
    .catch((err) => res.send(err));
};

exports.deleteCartItem = (req, res, next) => {
      Cart.findById(req.query.cartItemId,(err,item)=>{
          console.log(req.query.cartItemId);
if(!item){
    return next(new Error('Could not load Document'));
}else{
    Cart.deleteOne({ _id: req.query.cartItemId })
    .then((cart) => {
        console.log(item.Product_variety_id);
        ProductVariety.findById(item.Product_variety_id, function (err, productVariety) {
            if (!productVariety) {
              return next(new Error('Could not load Document'));
            }else{
              productVariety.updatedDate = new Date();
              productVariety.total_stock=productVariety.total_stock+item.quantity,
                
                
              productVariety.save(function (err) {
                if (err) {
                  res.send(err);
                }else{
                    res.json(cart);
                }
            })
        }});
      
    })
    .catch((err) => res.send(err));
}
      })
};
