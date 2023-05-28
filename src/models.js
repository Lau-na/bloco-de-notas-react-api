import { sequelize } from "./sequelize.js";
import { DataTypes } from "sequelize";

//Models
export const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: { type: DataTypes.STRING, allowNull: false },
    icon: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

export const Note = sequelize.define(
  "note",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
  },
  { timestamps: false }
);

//Associations
Category.hasMany(Note);
Note.belongsTo(Category);

User.hasMany(Note);
Note.belongsTo(User);

User.hasMany(Category);
Category.belongsTo(User);
