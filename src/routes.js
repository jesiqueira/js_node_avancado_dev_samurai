const { Router } = require("express");

const routes = new Router()

const customers = require('./app/controllers/CustomersControllers')

routes.get("/customers", customers.index)
routes.get("/customers/:id", customers.show)
routes.post("/customers", customers.create)
routes.put("/customers", customers.updade)
routes.delete("/customers", customers.destroy)

module.exports = routes