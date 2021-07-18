const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const passport = require('passport');
const logger = require("../Utils/tracer");

// this module is used to add new blog
module.exports.addBlog = (req, res) => {
    logger.info("In addBlog");
    var blog = new Blog();
    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(500).send(['Error while adding the record.']);
            else
                return next(err);
        }

    });
}

//this module is used to get blog details using title.If title not available, it will find all blogs.
module.exports.getBlogs = (req, res) => {
    logger.info("In getBlogs");
    var title = (typeof req.params.title != 'undefined') ? req.params.title : "";
    logger.info(title);
    var bolgData = "";
    if (title == "") {
        Blog.find({},
            (err, blog) => {
                if (!blog) {
                    return res.status(404).json({ status: false, message: 'Title Not Found.' });
                }
                else {
                    return res.status(200).json({ status: true, blog: blog });
                }
            }
        );
    } else {
        Blog.find({ title: title },
            (err, blog) => {
                if (!blog) {
                    return res.status(404).json({ status: false, message: 'Title Not Found.' });
                }
                else {
                    return res.status(200).json({ status: true, blog: blog });
                }
            }
        );
    }
}

//this module is used to update blog details based on title.
module.exports.updateBlog = (req, res) => {
    logger.info("In updateBlog");
    var title = req.params.title;
    Blog.update({ title: title }, req.body,
        (err, blog) => {
            if (blog.nModified == 0) {
                return res.status(404).json({ status: false, message: 'Title Not Found.' });
            }
            else {
                return res.status(200).json({ status: true, blog: blog });
            }
        }
    );
}

//this module is used to deleteBlog details based on title.
module.exports.deleteBlog = (req, res, next) => {
    logger.info("In deleteBlog");
    var title = req.params.title;
    Blog.remove({ title: title },
        (err, blog) => {
            if (err) {
                return res.status(500).json({ status: false, message: "Error while deleting record" });
            }
            if (blog.deletedCount == 0) {
                return res.status(404).json({ status: false, message: 'Title Not Found.' });
            }
            else {
                return res.status(200).json({ status: true, blog: blog });
            }
        }
    );
}