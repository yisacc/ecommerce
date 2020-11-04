const mongoose =require('mongoose');
const { OrderSchema } =require('../models/orderModel');

const Order = mongoose.model('Orders', OrderSchema);

exports.addNewOrder = (req, res, next) => {
    productVariety.updatedDate = new Date();
    productVariety.total_stock=productVariety.total_stock-req.body.quantity,
      
      
    productVariety.save(function (err) {
      if (err) {
        res.send(err);
      } else {
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
