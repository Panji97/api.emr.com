import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface user_menu_itemAttributes {
  id: number;
  user_id: number;
  item_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type user_menu_itemPk = "id";
export type user_menu_itemId = user_menu_item[user_menu_itemPk];
export type user_menu_itemOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type user_menu_itemCreationAttributes = Optional<user_menu_itemAttributes, user_menu_itemOptionalAttributes>;

export class user_menu_item extends Model<user_menu_itemAttributes, user_menu_itemCreationAttributes> implements user_menu_itemAttributes {
  id!: number;
  user_id!: number;
  item_id!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof user_menu_item {
    return user_menu_item.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_menu_item',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "user_menu_item_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
