const express = require('express');
const Users = require('./users-model.js');
const Posts = require('../posts/posts-model.js');
const {logger, validatePost, validateUser, validateUserId} = require('../middleware/middleware.js')

const router = express.Router();

router.get('/', logger, (req, res) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
});

router.get('/:id', logger, validateUserId, (req, res) => {
  res.status(200).json(req.id)
});

router.post('/', logger, validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
});

router.put('/:id', logger, validateUserId, validateUser, (req, res) => {
  const changes = req.body
  Users.update(req.params.id, changes)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
});

router.delete('/:id', logger, validateUserId, (req, res, next) => {
    Users.remove(req.params.id)
      .then(() => {
        res.status(200).json({message: `This is number deleted ${req.params.id}`})
      })
      .catch(err => {
        next({message: err.message})
      })
});

router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      if(posts){
        res.status(200).json(posts)
      } else {
        res.status(404).json({message: "Post not found"})
      }
    })
    .catch(err => {
      next({message: err.message})
    })
});

router.post('/:id/posts', logger, validateUserId, validatePost, (req, res, next) => {
  const postInfo = {...req.body, user_id: req.body.id}
  Posts.insert(postInfo)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      next({message: err.message})
    })
});

router.use((err,req,res,next)=>{
  res.status(500).json({
    message:"Something died",
    error:err.message
  })
})

module.exports = router;
