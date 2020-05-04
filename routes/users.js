var express = require('express');
var router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET users listing. */
router.get('/', async(req, res, next) => {
      try {

        const user = await db.User.findAll();

        res.format({
          
          // html: () => {
          //   res.render("User/index", {
          //     title: "User",
          //     User: User.rows
          //   })
          // },
    
          json: () => {
            res.status(200).send(user);
          }
        })
      } catch(e){
        res.status(500).send(e);
    }

});

router.post('/add', async(req, res, next) => {
  try {

    const user = await db.User.create({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password
    });
    
    res.format({
      
      // html: () => {
      //   res.render("User/index", {
      //     title: "User",
      //     User: User.rows
      //   })
      // },

      json: () => {
        res.status(201).send(user);
      }
    })
  } catch(e){
    res.status(500).send(e);
}

});

router.get('/:userId', async(req, res, next) => {
  try {

    const user = await db.User.findByPk(
      req.params.userId
    );

    res.format({
      
      // html: () => {
      //   res.render("User/index", {
      //     title: "User",
      //     User: User.rows
      //   })
      // },

      json: () => {
        res.status(200).send(user);
      }
    })
  } catch(e){
    res.status(500).send(e);
}

});


router.get('/:userId/edit', async(req, res, next) => {
  try {

    const user = await db.User.findByPk(
      req.params.userId
    );

    res.render("user/edit")

  } catch(e){
    res.status(500).send(e);
}

});

router.patch('/:userId', async(req, res, next) => {
  try {

    let where = {
      where: {
        id: req.params.userId
      }
    }

    let updates = {}

    if (req.body.firstName) {
      updates.firstName = req.body.firstName
    }
    if (req.body.lastName) {
      updates.lastName = req.body.lastName
    }
    if (req.body.email) {
      updates.email = req.body.email
    }
    if (req.body.password) {
      updates.password = req.body.password
    }

    const updateduser = await db.User.update(updates, where)

    res.format({

      // html: function () {
      //   res.redirect('/User')
      // },

      json: function () {
        res.status(200).send(updateduser);
      }
    })

  } catch (e) {
    res.status(500).send(e);
  }
})

router.delete('/:userId', async(req, res, next) => {
  try {

    const userdelete = await db.User.destroy({
      where: {id: req.params.userId}
    });

    res.format({

      // html: function () {
      //   res.redirect('/User')
      // },

      json: function () {
        res.sendStatus(200).send(userdelete);
      }
    })

  } catch(e){
    res.status(500).send(e);
}

});

module.exports = router;
