import dao from '../dao/saleDao';

exports.getAll = function (req, res) {
    dao.getAll({})
        .then(sales => res.json(sales))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.get = function (req, res) {
    dao.get({ _id: req.params.id })
        .then(sale => res.json(sale))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.create = function (req, res) {   
    dao.create(req.body)
        .then(sale => res.json(sale))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.update = function (req, res) {
    dao.update({ _id: req.params.id }, req.body)
        .then(sale => res.json(sale))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.delete = function (req, res) {
    dao.delete({ _id: req.params.id })
        .then(sale => res.json({}))
        .catch((err) => 
           res.status(500).json({error: err}));
}






