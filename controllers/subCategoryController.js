const mongoose =require('mongoose');
const { SubCategorySchema } =require('../models/subCategoryModel');

const SubCategory = mongoose.model('SubCategories', SubCategorySchema);

exports.addNewSubCategory = (req, res, next) => {
  let newSubCategory = new SubCategory({
    _id: new mongoose.Types.ObjectId(),
    sub_category_name: req.body.subCategoryName,
    category_id: req.body.categoryId,
    created_at: new Date(),
  });
  newSubCategory.save((err, newSubCategory) => {
    if (err) {
      res.send(err);
    }
    res.json(newSubCategory);
  });
};

exports.getSubCategoryById = (req, res, next) => {
    const subCategoryId=req.query.subCategoryId;
  if (subCategoryId) {
    SubCategory.find({ _id: subCategoryId })
      .then((subCategory) => {
        res.json(subCategory);
      })
      .catch((err) => res.send(err));
  } else {
    next();
  }
};
exports.fetchSubCategories = async (req, res) => {
 

    SubCategory.find()
    .then((subCategories) => {
      res.json(subCategories);
    })
    .catch((err) => res.send(err));
};
exports.editSubCategory = (req, res) => {
    SubCategory.findById(req.query.subCategoryId, function (err, subCategory) {
    if (!subCategory) {
      return next(new Error('Could not load Document'));
    } else {
        subCategory.updatedDate = new Date();
        subCategory.sub_category_name = req.body.subCategoryName;
        subCategory.category_id= req.body.categoryId;
        subCategory.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json(subCategory);
        }
      });
    }
  });
};
exports.deleteSubCategory = (req, res) => {
    SubCategory.deleteOne({ _id: req.query.subCategoryId })
    .then((subCategory) => {
      res.json(subCategory);
    })
    .catch((err) => res.send(err));
};
