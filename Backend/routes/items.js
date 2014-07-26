/**
 * Created by Andy on 7/26/2014.
 */

var Item = require('../models/item');

exports.findAll = function (req, res) {
    Item.find(function (err, items) {
        if (err)
            res.send(err);

        res.json(items);
    });
};

exports.findById = function (req, res) {
    Item.findById(req.params.id, function (err, bear) {
        if (err)
            res.send(err);
        res.json(bear);
    });
};


exports.addItem = function (req, res) {
    var item = new Item();
    item.name = req.body.name;

    item.save(function (err) {
        if (err)
            res.send(err);
        res.json({message: "Created item successfully"})
    });
};

exports.updateItem = function (req, res) {
    Item.findById(req.params.id, function (err, item) {

        if (err)
            res.send(err);

        item.name = req.body.name; 	// update the bears info

        // save the bear
        item.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Item updated!' });
        });

    });
};