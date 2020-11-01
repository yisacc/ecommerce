const mongoose =require('mongoose');
const { ReviewSchema } =require('../models/reviewModel');

const ProductReview = mongoose.model('Reviews', ReviewSchema);

exports.addNewProductReview = (req, res, next) => {
  let newproductReview = new ProductReview({
    _id: new mongoose.Types.ObjectId(),
    product_id: req.body.productId,
    title: req.body.title,
    text: req.body.text,
    rating: req.body.rating,
    user_id: req.body.userId,
    helpful_votes: req.body.helpfulVotes,
    voter_ids: req.body.voterId,
    created_at: new Date(),
  });
  newproductReview.save((err, newProductReview) => {
    if (err) {
      res.send(err);
    }
    res.json(newProductReview);
  });
};

exports.getProductReviewById = (req, res, next) => {
    const productReviewId=req.query.productReviewId;
  if (productReviewId) {
    ProductReview.find({ _id: productReviewId })
      .then((productReview) => {
        res.json(productReview);
      })
      .catch((err) => res.send(err));
  } else {
    next();
  }
};
exports.fetchProductReview = async (req, res) => {
 

  ProductReview.find()
    .then((productReviews) => {
      res.json(productReviews);
    })
    .catch((err) => res.send(err));
};
exports.editProductReview = (req, res) => {
  ProductReview.findById(req.query.productReviewId, function (err, productReview) {
    if (!productReview) {
      return next(new Error('Could not load Document'));
    } else {
        productReview.updatedDate = new Date();
        productReview.product_id= req.body.productId;
        productReview.title= req.body.title;
        productReview.text= req.body.text;
        productReview.rating= req.body.rating;
        productReview.user_id= req.body.userId;
        productReview.helpful_votes= req.body.helpfulVotes;
        productReview.voter_ids= req.body.voterId;
        productReview.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json(productReview);
        }
      });
    }
  });
};
exports.voteProductReview = (req, res) => {
  ProductReview.findById(req.query.productReviewId, function (err, productReview) {
    if (!productReview) {
      return next(new Error('Could not load Document'));
    } else {
        productReview.updatedDate = new Date();
        productReview.helpful_votes= productReview.helpful_votes + 1;
        productReview.voter_ids= req.body.voterId;
        productReview.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json(productReview);
        }
      });
    }
  });
};
exports.deleteProductReview = (req, res) => {
  ProductReview.deleteOne({ _id: req.query.productReviewId })
    .then((productReview) => {
      res.json(productReview);
    })
    .catch((err) => res.send(err));
};
