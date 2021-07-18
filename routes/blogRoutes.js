const express = require('express');
const blogController = require('./../controllers/BlogController');
const blogRouter = express.Router();

// routes for CRUD operation in blog
blogRouter.route('/addBlog').post(blogController.addBlog);
blogRouter.route('/getBlogs/:title?').get(blogController.getBlogs);
blogRouter.route('/updateBlog/:title').patch(blogController.updateBlog);
blogRouter.route('/deleteBlog/:title').delete(blogController.deleteBlog);

module.exports = blogRouter;