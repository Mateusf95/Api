const Pedido = require("../models/pedidosModel");

module.exports = {
    async all(req, res) {
        try {
            const pedidos = await Pedido.findAll();
            res.status(200).json(pedidos)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    async one(req, res) {
        try {
            const id = req.params.id;
            const pedido = await Pedido.findOne({ where: { id } });
            if (!pedido) {
                return res.status(400).json("Request not found");
            }
            res.status(200).json(pedido);
        } catch (error) {
            console.error(error);
            res.status(400).send(error);
        }
    },
    async create(req, res) {
        const { name, lastName, address, contact, request } = req.body;
        const pedido = new Pedido({
            name,
            lastName,
            address,
            contact,
            request
        })
        try {
            await pedido.save();
            res.status(200).json("Request inserted!")
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async update(req, res) {
        try {
            const { name, lastName, address, contact, request } = req.body;
            const id = req.params.id;
            const pedido = await Pedido.findOne({ where:  {id}  });
            if (!pedido) {
                return res.status(400).json("Request not found!");
            }
            pedido.name = name;
            pedido.lastName = lastName;
            pedido.address = address;
            pedido.contact = contact;
            pedido.request = request;
            await pedido.save();
            res.status(201).json("Request uptated!");
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const pedido = await Pedido.destroy({ where: { id } });
            if (!pedido) {
                return res.status(400).json("Request not found!");
            }
            res.status(200).json("Request removed!");
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
};