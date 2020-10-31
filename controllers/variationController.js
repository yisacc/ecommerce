const mongoose =require('mongoose');
const { VariationSchema } =require('../models/variationModel');

const Variation = mongoose.model('Variations', VariationSchema);

exports.addNewVariation = (req, res, next) => {
  let newVariation = new Variation({
    _id: new mongoose.Types.ObjectId(),
    variation_name: req.body.variationName,
    created_at: new Date(),
  });
  newVariation.save((err, newVariation) => {
    if (err) {
      res.send(err);
    }
    res.json(newVariation);
  });
};

exports.getVariationById = (req, res, next) => {
    const variationId=req.query.variationId;
  if (variationId) {
    Variation.find({ _id: variationId })
      .then((variation) => {
        res.json(variation);
      })
      .catch((err) => res.send(err));
  } else {
    next();
  }
};
exports.fetchVariations = async (req, res) => {
 

  Variation.find()
    .then((variations) => {
      res.json(variations);
    })
    .catch((err) => res.send(err));
};
exports.editVariation = (req, res) => {
    Variation.findById(req.query.variationId, function (err, variation) {
    if (!variation) {
      return next(new Error('Could not load Document'));
    } else {
        variation.updatedDate = new Date();
        variation.variation_name = req.body.variationName;
        variation.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json(variation);
        }
      });
    }
  });
};
exports.deleteVariation = (req, res) => {
    Variation.deleteOne({ _id: req.query.variationId })
    .then((variation) => {
      res.json(variation);
    })
    .catch((err) => res.send(err));
};
