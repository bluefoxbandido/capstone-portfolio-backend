const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Blog = require("../models/blogItem");

router.get("/", (req, res) => {
  res.json("Blog DB");
});

router.get("/all", (req, res) => {
  Blog.find()
    .then(blogItems => res.json(blogItems))
    .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json(err));
});

router.post("/create", auth, (req, res) => {
  const title = req.body.title;
  const date = req.body.date;
  const body = req.body.body;
  const gitUrl = req.body.gitUrl;
  const languages = req.body.languages;
  const frameworks = req.body.frameworks;
  const libraries = req.body.libraries;

  const newBlog = new Blog({
    title,
    date,
    body,
    gitUrl,
    languages,
    frameworks,
    libraries
  });

  newBlog
    .save()
    .then(() => res.json("Blog Item Added"))
    .catch(err => res.status(400).json(err));
});

router.patch("/:id", auth, (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      blog.title = req.body.title;
      blog.date = req.body.date;
      blog.body = req.body.body;
      blog.gitUrl = req.body.gitUrl;
      blog.languages = req.body.languages;
      blog.frameworks = req.body.frameworks;
      blog.libraries = req.body.libraries;

      blog
        .save()
        .then(() => res.json("Blog added"))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
});

router.delete("/deleteBlog/:id", auth, (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json("Blog Deleted"))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
