import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface roles_has_mchildAttributes {
  id: number;
  role_id: number;
  mparent_id: number;
  mmain_id: number;
  role_parent_id: number;
  mchild_id: number;
  role_main_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type roles_has_mchildPk = "id";
export type roles_has_mchildId = roles_has_mchild[roles_has_mchildPk];
export type roles_has_mchildOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type roles_has_mchildCreationAttributes = Optional<roles_has_mchildAttributes, roles_has_mchildOptionalAttributes>;

export class roles_has_mchild extends Model<roles_has_mchildAttributes, roles_has_mchildCreationAttributes> implements roles_has_mchildAttributes {
  id!: number;
  role_id!: number;
  mparent_id!: number;
  mmain_id!: number;
  role_parent_id!: number;
  mchild_id!: number;
  role_main_id!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof roles_has_mchild {
    return roles_has_mchild.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mparent_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mmain_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role_parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mchild_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role_main_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'roles_has_mchild',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "roles_has_mparent_pk_1_1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
