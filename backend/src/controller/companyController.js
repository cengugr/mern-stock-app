import dao from '../dao/companyDao';

exports.getAll = function (req, res) {
    dao.getAll({})
        .then(companies => res.json(companies))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.get = function (req, res) {
    dao.get({ _id: req.params.id })
        .then(company => res.json(company))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.create = function (req, res) {   
    dao.create(req.body)
        .then(company => res.json(company))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.update = function (req, res) {
    dao.update({ _id: req.params.id }, req.body)
        .then(company => res.json(company))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.delete = function (req, res) {
    dao.delete({ _id: req.params.id })
        .then(company => res.json({}))
        .catch((err) => 
           res.status(500).json({error: err}));
}






