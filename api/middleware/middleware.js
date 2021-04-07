const User = require('../users/users-model');

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get("Origin")}`)
  next()
}

const validateUserId = async(req, res, next) =>{
  try{
    const id = await User.getById(req.params.id)
    if(!id){
      res.status(404).json({message: "user not found"})
    } else {
      req.id = id
      next()
    }
  } catch(err) {
    res.status(500).json(err.message)
  }
}

function validateUser(req, res, next) {
  if(!req.body){
    res.status(400).json({message: 'missing user data'})
  } else if (!req.body.name){
    res.status(400).json({message: "missing required name field"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({message: "missing post data"})
  } else if (!req.body.text){
    res.status(400).json({message: "missing required text field"})
  } else{
    next()
  }
}

module.exports = {
  logger, validatePost, validateUser, validateUserId
}