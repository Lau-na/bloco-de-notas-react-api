import { Op } from "sequelize";
import { Note, Category, User } from "./models.js";
import jwt from "jsonwebtoken";

export const NoteService = {
  async get(req, res) {
    const note = await Note.findByPk(req.params.id);
    res.status(200).json(note);
  },

  async list(req, res) {
    const options = { include: Category };

    const search = req.query.search;

    if (search) {
      const like = `%${search}%`;
      options.where = {
        [Op.or]: {
          title: { [Op.like]: like },
          text: { [Op.like]: like },
        },
      };
    }

    const notes = await Note.findAll(options);
    res.status(200).json(notes);
  },

  async delete(req, res) {
    const note = await Note.findByPk(req.params.id);
    await note.destroy();
    res.status(200).json(note);
  },

  async insert(req, res) {
    const note = await Note.create(req.body);
    res.status(200).json(note);
  },

  async update(req, res) {
    const note = await Note.findByPk(req.params.id);
    await note.update(req.body);
    res.status(200).json(note);
  },
};

export const CategoryService = {
  async get(req, res) {
    const category = await Category.findByPk(req.params.id);
    res.status(200).json(category);
  },

  async list(req, res) {
    const { sub } = req.auth;
    const categories = await Category.findAll({ where: { userId: sub } });
    res.status(200).json(categories);
  },

  async delete(req, res) {
    const category = await Category.findByPk(req.params.id);
    await category.destroy();
    res.status(200).json(category);
  },

  async insert(req, res) {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  },

  async update(req, res) {
    const category = await Category.findByPk(req.params.id);
    await category.update(req.body);
    res.status(200).json(category);
  },
};

export const LoginService = {
  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });
    if (!user) {
      res.status(401).json({ message: "Usuário ou senha incorretos" });
    } else {
      const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_KEY, {
        expiresIn: "1 day",
      });
      res.status(200).json({ token });
    }
  },
  async authenticate(req, res, next) {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      req.auth = jwt.verify(token, process.env.JWT_KEY);
      next();
    } catch (error) {
      res.status(401).send();
    }
  },
  async authorize(req, res, next) {
    const { role } = req.auth;
    if (role === "admin") {
      next();
    } else {
      res.status(403).send();
    }
  },
};

export const UserService = {
  async list(req, res) {
    const notes = await User.findAll();
    res.status(200).json(notes);
  },
};
