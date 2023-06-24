import dao from '../dao/purchaseDao';
import queryCreator from '../helper/queryCreator';

exports.getAll = function (req, res) {
    dao.getAll({})
        .then(purchases => res.json(purchases))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.get = function (req, res) {
    dao.get({ _id: req.params.id })
        .then(purchase => res.json(purchase))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.create = function (req, res) {   
  
    dao.create(req.body)
        .then(purchase => res.json(purchase))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.update = function (req, res) {
    dao.update({ _id: req.params.id }, req.body)
        .then(purchase => res.json(purchase))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.delete = function (req, res) {
    dao.delete({ _id: req.params.id })
        .then(purchase => res.json({}))
        .catch((err) => 
           res.status(500).json({error: err}));
}

exports.getCompaniesWithFilterandPaginationandSorter = function (req, res) {

    let body = req.body;
    let page = req.params.page;
    let limit = req.params.limit;
    let sort = {};
    if(body.sort && body.sort.sortOrder && body.sort.sortField){
        sort[body.sort.sortField] = body.sort.sortOrder;
    }
    else 
    sort = {_id: -1};

    let query = queryCreator.convertToQuery({...body.filter});
        console.log(body.filter);
        console.log(query);
        console.log(sort);  
        if(body.filter.company)
        query.company = body.filter.company; 
    
        
    dao.getCompaniesWithFilterandPaginationandSorter(query, page, limit, sort )
        .then(companies => res.json(companies))
        .catch((err) => 
           res.status(500).json({error: err}));
}





