const mongoose =require('mongoose');
const { OrderSchema } =require('../models/orderModel');
const { ProductVarietySchema } =require('../models/productVarietyModel');
const { CartSchema } =require('../models/cartModel');

const Order = mongoose.model('Orders', OrderSchema);
const ProductVariety = mongoose.model('ProductVarieties', ProductVarietySchema);


const Cart = mongoose.model('Cart', CartSchema);

exports.addNewOrder = (req, res, next) => {
Cart.findById(req.body.cartId,function (err,cart) {
    if (!cart) {
        return res.send('Could not load Document');
      } else {
        ProductVariety.findById(cart.Product_variety_id,function (err,prodVar) {
            if (!prodVar) {
                return res.send('Could not load Document');
              } else {
                prodVar.total_stock=prodVar.total_stock-cart.quantity,
                prodVar.save(function (err) {
                    if (err) {
                        res.send(err);
                      } else {
                        Cart.deleteOne({ _id: req.query.cartItemId }).then((cart)=>{
                            let newOrder = new Order({
                                _id: new mongoose.Types.ObjectId(),
                                cart_id: req.body.cartId,
                                created_at: new Date(),
                              });
                              newOrder.save((err, newOrder) => {
                                if (err) {
                                  res.send(err);
                                }
                                res.json(newOrder);
                              });
                        })
                        .catch((error)=>{
                            res.send(error);
                        })
                      }
                })
              }
        })
      }
})
    
    

};

exports.getOrderById = (req, res, next) => {
    const orderId=req.query.orderId;
  if (orderId) {
    Order.find({ _id: orderId })
      .then((order) => {
        res.json(order);
      })
      .catch((err) => res.send(err));
  } else {
    next();
  }
};
exports.fetchOrders = async (req, res) => {
 

    Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => res.send(err));
};
exports.editOrder = (req, res) => {
    Order.findById(req.query.orderId, function (err, order) {
    if (!order) {
      return next(new Error('Could not load Document'));
    } else {
        Order.updatedDate = new Date();
        Order.cart_id = req.body.cartId;
        Order.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json(variation);
        }
      });
    }
  });
};
exports.deleteOrder = (req, res) => {
    Order.deleteOne({ _id: req.query.orderId })
    .then((order) => {
      res.json(order);
    })
    .catch((err) => res.send(err));
};
