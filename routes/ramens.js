var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET ramens listing. */
router.get('/', async(req, res, next) => {
      try {

        const ramen = await db.Ramen.findAll();

        res.format({
          
          html: () => {
            res.render("ramens/index", {
              title: "Ramen",
              ramen: ramen
            })
          },
    
          json: () => {
            res.status(200).send(ramen);
          }
        })
      } catch(e){
        res.status(500).send(e);
    }

});

router.post('/', async(req, res, next) => {
  try {

    const ramen = await db.Ramen.create({
      Nom : req.body.Nom,
      Marque : req.body.Marque,
      Gout : req.body.Gout,
      Note : req.body.Note
    });

    res.format({
      
      html: () => {
        res.redirect("/ramens")},

      json: () => {
        res.status(201).send(ramen);
      }
    })
  } catch(e){
    res.status(500).send(e);
}

});

router.get('/add', async(req, res, next) => {
  try {
      res.render("ramens/add")
  } catch(e){
    res.status(500).send(e);
}

});

router.get('/:ramenId', async(req, res, next) => {
  try {

    const ramen = await db.Ramen.findByPk(
      req.params.ramenId
    );

    res.format({
      
      html: () => {
        res.render("ramens/info", {
          title: "ramen info",
          ramen: ramen
        })
      },

      json: () => {
        res.status(200).send(ramen);
      }
    })
  } catch(e){
    res.status(500).send(e);
}

});


router.get('/:ramenId/edit', async(req, res, next) => {
  try {

    const ramen = await db.Ramen.findByPk(
      req.params.ramenId
    );

    res.format({
      html: () => {
        res.render("ramens/edit", {
          title: "ramen",
          ramen: ramen
        })
      }
    })
  } catch(e){
    res.status(500).send(e);
}

});

router.patch('/:ramenId', async(req, res, next) => {
  try {

    let where = {
      where: {
        id: req.params.ramenId
      }
    }

    let updates = {}

    if (req.body.Nom) {
      updates.Nom = req.body.Nom
    }
    if (req.body.Marque) {
      updates.Marque = req.body.Marque
    }
    if (req.body.Gout) {
      updates.Gout = req.body.Gout
    }
    if (req.body.Note) {
      updates.Note = req.body.Note
    }

    const updatedramen = await db.Ramen.update(updates, where)

    res.format({

      html: function () {
        res.redirect('/ramens')
      },

      json: function () {
        res.status(200).send(updatedramen);
      }
    })

  } catch (e) {
    res.status(500).send(e);
  }
})

router.delete('/:ramenId', async(req, res, next) => {
  try {

    const ramendelete = await db.Ramen.destroy({
      where: {id: req.params.ramenId}
    });

    res.format({

      html: function () {
        res.redirect('/ramens')
      },

      json: function () {
        res.sendStatus(200).send(ramendelete);
      }
    })

  } catch(e){
    res.status(500).send(e);
}

});

module.exports = router;
