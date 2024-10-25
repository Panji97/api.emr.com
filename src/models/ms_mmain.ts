import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ms_mchild, ms_mchildId } from './ms_mchild';
import type { ms_mparent, ms_mparentId } from './ms_mparent';
import type { roles_has_mchild, roles_has_mchildId } from './roles_has_mchild';
import type { roles_has_mmain, roles_has_mmainId } from './roles_has_mmain';

export interface ms_mmainAttributes {
  id: number;
  header_id?: number;
  label?: string;
  icon?: string;
  to_path?: string;
  url?: string;
  target?: string;
  badge?: string;
  class?: string;
  preventexact?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ms_mmainPk = "id";
export type ms_mmainId = ms_mmain[ms_mmainPk];
export type ms_mmainOptionalAttributes = "id" | "header_id" | "label" | "icon" | "to_path" | "url" | "target" | "badge" | "class" | "preventexact" | "createdAt" | "updatedAt" | "deletedAt";
export type ms_mmainCreationAttributes = Optional<ms_mmainAttributes, ms_mmainOptionalAttributes>;

export class ms_mmain extends Model<ms_mmainAttributes, ms_mmainCreationAttributes> implements ms_mmainAttributes {
  id!: number;
  header_id?: number;
  label?: string;
  icon?: string;
  to_path?: string;
  url?: string;
  target?: string;
  badge?: string;
  class?: string;
  preventexact?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // ms_mmain hasMany ms_mchild via menu_id
  ms_mchildren!: ms_mchild[];
  getMs_mchildren!: Sequelize.HasManyGetAssociationsMixin<ms_mchild>;
  setMs_mchildren!: Sequelize.HasManySetAssociationsMixin<ms_mchild, ms_mchildId>;
  addMs_mchild!: Sequelize.HasManyAddAssociationMixin<ms_mchild, ms_mchildId>;
  addMs_mchildren!: Sequelize.HasManyAddAssociationsMixin<ms_mchild, ms_mchildId>;
  createMs_mchild!: Sequelize.HasManyCreateAssociationMixin<ms_mchild>;
  removeMs_mchild!: Sequelize.HasManyRemoveAssociationMixin<ms_mchild, ms_mchildId>;
  removeMs_mchildren!: Sequelize.HasManyRemoveAssociationsMixin<ms_mchild, ms_mchildId>;
  hasMs_mchild!: Sequelize.HasManyHasAssociationMixin<ms_mchild, ms_mchildId>;
  hasMs_mchildren!: Sequelize.HasManyHasAssociationsMixin<ms_mchild, ms_mchildId>;
  countMs_mchildren!: Sequelize.HasManyCountAssociationsMixin;
  // ms_mmain hasMany roles_has_mchild via mmain_id
  roles_has_mchildren!: roles_has_mchild[];
  getRoles_has_mchildren!: Sequelize.HasManyGetAssociationsMixin<roles_has_mchild>;
  setRoles_has_mchildren!: Sequelize.HasManySetAssociationsMixin<roles_has_mchild, roles_has_mchildId>;
  addRoles_has_mchild!: Sequelize.HasManyAddAssociationMixin<roles_has_mchild, roles_has_mchildId>;
  addRoles_has_mchildren!: Sequelize.HasManyAddAssociationsMixin<roles_has_mchild, roles_has_mchildId>;
  createRoles_has_mchild!: Sequelize.HasManyCreateAssociationMixin<roles_has_mchild>;
  removeRoles_has_mchild!: Sequelize.HasManyRemoveAssociationMixin<roles_has_mchild, roles_has_mchildId>;
  removeRoles_has_mchildren!: Sequelize.HasManyRemoveAssociationsMixin<roles_has_mchild, roles_has_mchildId>;
  hasRoles_has_mchild!: Sequelize.HasManyHasAssociationMixin<roles_has_mchild, roles_has_mchildId>;
  hasRoles_has_mchildren!: Sequelize.HasManyHasAssociationsMixin<roles_has_mchild, roles_has_mchildId>;
  countRoles_has_mchildren!: Sequelize.HasManyCountAssociationsMixin;
  // ms_mmain hasMany roles_has_mmain via mmain_id
  roles_has_mmains!: roles_has_mmain[];
  getRoles_has_mmains!: Sequelize.HasManyGetAssociationsMixin<roles_has_mmain>;
  setRoles_has_mmains!: Sequelize.HasManySetAssociationsMixin<roles_has_mmain, roles_has_mmainId>;
  addRoles_has_mmain!: Sequelize.HasManyAddAssociationMixin<roles_has_mmain, roles_has_mmainId>;
  addRoles_has_mmains!: Sequelize.HasManyAddAssociationsMixin<roles_has_mmain, roles_has_mmainId>;
  createRoles_has_mmain!: Sequelize.HasManyCreateAssociationMixin<roles_has_mmain>;
  removeRoles_has_mmain!: Sequelize.HasManyRemoveAssociationMixin<roles_has_mmain, roles_has_mmainId>;
  removeRoles_has_mmains!: Sequelize.HasManyRemoveAssociationsMixin<roles_has_mmain, roles_has_mmainId>;
  hasRoles_has_mmain!: Sequelize.HasManyHasAssociationMixin<roles_has_mmain, roles_has_mmainId>;
  hasRoles_has_mmains!: Sequelize.HasManyHasAssociationsMixin<roles_has_mmain, roles_has_mmainId>;
  countRoles_has_mmains!: Sequelize.HasManyCountAssociationsMixin;
  // ms_mmain belongsTo ms_mparent via header_id
  header!: ms_mparent;
  getHeader!: Sequelize.BelongsToGetAssociationMixin<ms_mparent>;
  setHeader!: Sequelize.BelongsToSetAssociationMixin<ms_mparent, ms_mparentId>;
  createHeader!: Sequelize.BelongsToCreateAssociationMixin<ms_mparent>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ms_mmain {
    return ms_mmain.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    header_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ms_mparent',
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    to_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    target: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    badge: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    class: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    preventexact: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ms_mmain',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "menus_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
