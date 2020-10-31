const mongoose =require('mongoose');
const { VariationOptionSchema } =require('../models/variationOptionModel');

const VariationOption = mongoose.model('VariationOptions', VariationOptionSchema);

exports.addNewVariationOption = (req, res, next) => {
  let newVariationOption = new VariationOption({
    _id: new mongoose.Types.ObjectId(),
    variation_id: req.body.variationId,
    option_name: req.body.optionName,
    created_at: new Date(),
  });
  newVariationOption.save((err, newVariationOption) => {
    if (err) {
      res.send(err);
    }
    res.json(newVariationOption);
  });
};

exports.getVariationOptionById = (req, res, next) => {
    const variationOptionId=req.query.variationOptionId;
  if (variationOptionId) {
  VariationOption.find({ _id: variationOptionId })
      .then((variationOption) => {
        res.json(variationOption);
      })
      .catch((err) => res.send(err));
  } else {
    next();
  }
};
exports.fetchVariationOptions = async (req, res) => {
 

    VariationOption.find()
    .then((variations) => {
      res.json(variations);
    })
    .catch((err) => res.send(err));
};
exports.editVariationOption = (req, res) => {
    VariationOption.findById(req.query.variationOptionId, function (err, variationOption) {
    if (!variationOption) {
      return next(new Error('Could not load Document'));
    } else {
        variationOption.updatedDate = new Date();
        variationOption.variation_id = req.body.variationId;
        variationOption.option_name=req.body.optionName;
        variationOption.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json(variationOption);
        }
      });
    }
  });
};
exports.deleteVariationOption = (req, res) => {
    VariationOption.deleteOne({ _id: req.query.variationOptionId })
    .then((variationOption) => {
      res.json(variationOption);
    })
    .catch((err) => res.send(err));
};
