# MERN STACK DEMO LAB

## Demo Projesi: Ürün-Stok Yönetimi

20.06.2023
─

---

## Proje mimarisi:

### Demo Adımları

- Backend REST API (Mongo, Node, Express)
- Frontend Client (React)

### Teknolojiler ve Kütüphaneler:

- Backend: Node.js, Express, @babel/core, @babel/node, @babel/preset-env, body-parser, cors, mongoose
- Frontend: React, react-router-dom, antd, axios

### Database Collection’ları

- company (name, sector, size)
- product (name, unit, category)
- purchase (company, supplierName, deliveryDate, purchaseProducts (list))
- purchaseProducts (purchase, product, count, price)
- sale (company, customerName, salesDate, saleProducts (list))
- saleProducts (sale, product, count, price)
- stock (company, product, count)
