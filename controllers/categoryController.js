const mongoose =require('mongoose');
const { CategorySchema } =require('../models/categoryModel');

const Category = mongoose.model('Categories', CategorySchema);

exports.addNewCategory = (req, res, next) => {
  let newCategory = new Category({
    _id: new mongoose.Types.ObjectId(),
    category_name: req.body.categoryName,
    created_at: new Date(),
  });
  newCategory.save((err, newCategory) => {
    if (err) {
      res.send(err);
    }
    res.json(newCategory);
  });
};

exports.getCategoryById = (req, res, next) => {
    const categoryId=req.query.categoryId;
  if (categoryId) {
    Category.find({ _id: categoryId })
      .then((category) => {
        res.json(category);
      })
      .catch((err) => res.send(err));
  } else {
    next();
  }
};
exports.fetchCategories = async (req, res) => {
 

    Category.find()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => res.send(err));
};
exports.editCategory = (req, res) => {
    Category.findById(req.query.categoryId, function (err, category) {
    if (!category) {
      return next(new Error('Could not load Document'));
    } else {
        category.updatedDate = new Date();
        category.category_name = req.body.categoryName;
        category.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json(category);
        }
      });
    }
  });
};
exports.deletecategory = (req, res) => {
    Category.deleteOne({ _id: req.query.categoryId })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => res.send(err));
};
