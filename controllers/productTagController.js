const mongoose =require('mongoose');
const { ProductTagSchema } =require('../models/productTagModel');

const Tag = mongoose.model('ProductTags', ProductTagSchema);

exports.addNewTag = (req, res, next) => {
  let newTag = new Tag({
    _id: new mongoose.Types.ObjectId(),
    tag_name: req.body.tagName,
    created_at: new Date(),
  });
  newTag.save((err, newTag) => {
    if (err) {
      res.send(err);
    }
    res.json(newTag);
  });
};

exports.getTagById = (req, res, next) => {
    const tagId=req.query.tagId;
  if (tagId) {
    Tag.find({ _id: tagId })
      .then((tag) => {
        res.json(tag);
      })
      .catch((err) => res.send(err));
  } else {
    next();
  }
};
exports.fetchTags = async (req, res) => {
 

  Tag.find()
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => res.send(err));
};
exports.editTag = (req, res) => {
  Tag.findById(req.query.tagId, function (err, tag) {
    if (!tag) {
      return next(new Error('Could not load Document'));
    } else {
      tag.updatedDate = new Date();
        tag.tag_name = req.body.tagName;
        tag.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json(tag);
        }
      });
    }
  });
};
exports.deleteTag = (req, res) => {
  Tag.deleteOne({ _id: req.query.tagId })
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => res.send(err));
};
