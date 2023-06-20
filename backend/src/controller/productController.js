import dao from '../dao/productDao';

exports.getAll = function (req, res) {
    dao.getAll({})
        .then(products => res.json(products))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.get = function (req, res) {
    dao.get({ _id: req.params.id })
        .then(product => res.json(product))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.create = function (req, res) {   
    dao.create(req.body)
        .then(product => res.json(product))
        .catch((err) => 
           res.status(500).json({hata: err})); 
}

exports.update = function (req, res) {
    dao.update({ _id: req.params.id }, req.body)
        .then(product => res.json(product))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.delete = function (req, res) {
    dao.delete({ _id: req.params.id })
        .then(product => res.json({}))
        .catch((err) => 
           res.status(500).json({error: err}));
}






