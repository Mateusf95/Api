const Doacao = require("../models/doacoesModel");

module.exports = {
    async all(req, res) {
        try {
            const doacao = await Doacao.findAll();
            res.status(200).json(doacao)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    async one(req, res) {
        try {
            const id = req.params.id;
            const doacao = await Doacao.findOne({ where: { id } });
            if (!doacao) {
                return res.status(400).json("Donation not found");
            }
            res.status(200).json(doacao);
        } catch (error) {
            console.error(error);
            res.status(400).send(error);
        }
    },
    async create(req, res) {
        const { name, lastName, address, contact, request } = req.body;
        const doacao = new Doacao({
            name,
            lastName,
            address,
            contact,
            request
        })
        try {
            await doacao.save();
            res.status(200).json("Donation inserted!")
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async update(req, res) {
        try {
            const { name, lastName, address, contact, request } = req.body;
            const id = req.params.id;
            const doacao = await Doacao.findOne({ where:  {id}  });
            if (!doacao) {
                return res.status(400).json("Donation not found!");
            }
            doacao.name = name;
            doacao.lastName = lastName;
            doacao.address = address;
            doacao.contact = contact;
            doacao.request = request;
            await doacao.save();
            res.status(201).json("Donation uptated!");
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const doacao = await Doacao.destroy({ where: { id } });
            if (!doacao) {
                return res.status(400).json("Donation not found!");
            }
            res.status(200).json("Donation removed!");
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
};