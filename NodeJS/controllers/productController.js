const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Product } = require('../models/product');

router.get('/', (req, res) => {
    Product.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('error retrieving products :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('no record with given id : ${req.params.id}');
    
    Product.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('error in retrieving product :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var prod = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        units: req.body.units
    });
    prod.save((err, doc) => {
        if(!err) { res.send(doc); }
        else { console.log('error in product save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('no record with given id : ${req.params.id');
    var prod = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        units: req.body.units
    };
    Product.findByIdAndUpdate(req.params.id, { $set: prod }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('error in product update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('no record with given id : ${req.params.id}');
    
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('error in product delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;