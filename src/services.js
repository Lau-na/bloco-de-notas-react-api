import { Op } from "sequelize";
import { Note, Category, User } from "./models.js";
import jwt from "jsonwebtoken";

export const NoteService = {
  async get(req, res) {
    const id = req.params.id;
    const userId = req.auth.sub;
    const note = await Note.findOne({ where: { id, userId } });
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(400).json({ message: "Nota não encontrada" });
    }
  },

  async list(req, res) {
    const userId = req.auth.sub;
    const options = { include: Category, where: { userId } };

    const search = req.query.search;

    if (search) {
      const like = `%${search}%`;
      options.where[Op.or] = {
        title: { [Op.like]: like },
        text: { [Op.like]: like },
      };
    }

    const notes = await Note.findAll(options);
    res.status(200).json(notes);
  },

  async delete(req, res) {
    const id = req.params.id;
    const userId = req.auth.sub;
    const note = await Note.findOne({ where: { id, userId } });
    if (note) {
      await note.destroy();
      res.status(200).json(note);
    } else {
      res.status(400).json({ message: "Nota não encontrada" });
    }
  },

  async insert(req, res) {
    const body = req.body;
    const userId = req.auth.sub;
    const note = await Note.create({ ...body, userId });
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(500).json({ message: "Ocorreu um erro ao criar a nota" });
    }
  },

  async update(req, res) {
    const id = req.params.id;
    const userId = req.auth.sub;
    const body = req.body;
    const note = await Note.findOne({ where: { id, userId } });
    if (note) {
      await note.update({ ...body });
      res.status(200).json(note);
    } else {
      res.status(400).json({ message: "Nota não encontrada" });
    }
  },
};

export const CategoryService = {
  async get(req, res) {
    const id = req.params.id;
    const userId = req.auth.sub;
    const category = await Category.findOne({ where: { id, userId } });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(400).json({ message: "Categoria não encontrada" });
    }
  },

  async list(req, res) {
    const userId = req.auth.sub;
    const categories = await Category.findAll({ where: { userId } });
    if (categories) {
      res.status(200).json(categories);
    } else {
      res.status(400).json({ message: "Categorias não encontradas" });
    }
  },

  async delete(req, res) {
    const id = req.params.id;
    const userId = req.auth.sub;
    const category = await Category.findOne({ where: { id, userId } });
    if (category) {
      try {
        await category.destroy();
        res.status(200).json(category);
      } catch (error) {
        res.status(400).json({ message: "Categoria está vinculada a outras notas" });
      }
    } else {
      res.status(400).json({ message: "Categoria não encontrada" });
    }
  },

  async insert(req, res) {
    const body = req.body;
    const userId = req.auth.sub;
    const category = await Category.create({ ...body, userId });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(500).json({ message: "Ocorreu um erro ao criar a categoria" });
    }
  },

  async update(req, res) {
    const id = req.params.id;
    const userId = req.auth.sub;
    const body = req.body;
    const category = await Category.findOne({ where: { id, userId } });
    if (category) {
      await category.update({ ...body });
      res.status(200).json(category);
    } else {
      res.status(400).json({ message: "Categoria não encontrada" });
    }
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
    const users = await User.findAll();
    res.status(200).json(users);
  },
  async me(req, res) {
    const user = await User.findByPk(req.auth.sub);
    res.status(200).json(user);
  },
};
