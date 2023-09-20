const express = require('express');
const router = express.Router();
const {Elements} = require('../models');
const {validateToken} = require("../middlewares/AuthMiddelware");


router.get("/", async (req, res) =>{
    const listOfElements = await Elements.findAll()
    res.json(listOfElements);
});

router.get('/byId/:id', async (req, res) =>{
    const id = req.params.id
    const element = await Elements.findByPk(id)
    res.json(element);
});

router.get('/byuserId/:id', async (req, res) =>{
    const id = req.params.id;
    const listOfElement = await Elements.findAll(
        {where: {userId: id}});
    res.json(listOfElement);
});

router.post("/", validateToken, async (req, res) => {
    const elements = req.body;
    elements.username = req.user.username;
    elements.userId = req.user.id;
    await Elements.create(elements);
    res.json(elements);

});

router.delete("/:elementId", validateToken, async (req,res) => {
    const elementId = req.params.elementId;

    await Elements.destroy({
        where:{
            id: elementId,
        },
    });

    res.json("Element usunięty")
})

// edytuję zadanie
router.patch("/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const element = req.body;

    await Elements.update({
        title: element.title,
        info: element.info,
        shop: element.shop
    }, {
        where: {
            id: id
        }
    });
    res.json(element);
});

module.exports = router;