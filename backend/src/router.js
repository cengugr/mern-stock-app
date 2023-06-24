import companyController from './controller/companyController';
import productController from './controller/productController';
import purchaseController from './controller/purchaseController';
import saleController from './controller/saleController';
import stockController from './controller/stockController';

module.exports = (router) => {

    router.get('/company/:id', companyController.get);
    router.get('/company', companyController.getAll);
    router.post('/company', companyController.create);
    router.put('/company/:id', companyController.update);
    router.delete('/company/:id', companyController.delete); 
    router.post('/company/:page/:limit', companyController.getCompaniesWithFilterandPaginationandSorter);


    router.get('/product/:id', productController.get);
    router.get('/product', productController.getAll);
    router.post('/product', productController.create);
    router.put('/product/:id', productController.update);
    router.delete('/product/:id', productController.delete);

    router.get('/purchase/:id', purchaseController.get);
    router.get('/purchase', purchaseController.getAll);
    router.post('/purchase', purchaseController.create);
    router.put('/purchase/:id', purchaseController.update);
    router.delete('/purchase/:id', purchaseController.delete);
    router.post('/purchase/:page/:limit', purchaseController.getCompaniesWithFilterandPaginationandSorter);


    router.get('/sale/:id', saleController.get);
    router.get('/sale', saleController.getAll);
    router.post('/sale', saleController.create);
    router.put('/sale/:id', saleController.update);
    router.delete('/sale/:id', saleController.delete); 

    router.get('/stock/:id', stockController.get);
    router.get('/stock', stockController.getAll);
    router.post('/stock', stockController.create);
    router.put('/stock/:id', stockController.update);
    router.delete('/stock/:id', stockController.delete);
    

 }
