import { Note } from "./models.js";
import { Category } from "./models.js";

export const notes = {
  async get(req, res) {
    const document = await Note.findById(req.params.id);
    res.status(200).json(document);
  },

  async list(req, res) {
    const query = {};
    const search = req.query.search;

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ title: regex }, { text: regex }];
    }

    const documents = await Note.find(query);
    res.status(200).json(documents);
  },

  async delete(req, res) {
    const document = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json(document);
  },

  async insert(req, res) {
    const document = await Note.create(req.body);
    res.status(200).json(document);
  },

  async update(req, res) {
    const document = await Note.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(document);
  },
};

export const categories = {
  async get(req, res) {
    const document = await Category.findById(req.params.id);
    res.status(200).json(document);
  },

  async list(req, res) {
    const documents = await Category.find();
    res.status(200).json(documents);
  },

  async delete(req, res) {
    const document = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(document);
  },

  async insert(req, res) {
    const document = await Category.create(req.body);
    res.status(200).json(document);
  },

  async update(req, res) {
    const document = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(document);
  },
};
