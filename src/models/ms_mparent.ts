import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ms_mmain, ms_mmainId } from './ms_mmain';
import type { roles_has_mchild, roles_has_mchildId } from './roles_has_mchild';
import type { roles_has_mmain, roles_has_mmainId } from './roles_has_mmain';
import type { roles_has_mparent, roles_has_mparentId } from './roles_has_mparent';

export interface ms_mparentAttributes {
  id: number;
  label: string;
  icon?: string;
  to_path?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ms_mparentPk = "id";
export type ms_mparentId = ms_mparent[ms_mparentPk];
export type ms_mparentOptionalAttributes = "id" | "icon" | "to_path" | "createdAt" | "updatedAt" | "deletedAt";
export type ms_mparentCreationAttributes = Optional<ms_mparentAttributes, ms_mparentOptionalAttributes>;

export class ms_mparent extends Model<ms_mparentAttributes, ms_mparentCreationAttributes> implements ms_mparentAttributes {
  id!: number;
  label!: string;
  icon?: string;
  to_path?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // ms_mparent hasMany ms_mmain via header_id
  ms_mmains!: ms_mmain[];
  getMs_mmains!: Sequelize.HasManyGetAssociationsMixin<ms_mmain>;
  setMs_mmains!: Sequelize.HasManySetAssociationsMixin<ms_mmain, ms_mmainId>;
  addMs_mmain!: Sequelize.HasManyAddAssociationMixin<ms_mmain, ms_mmainId>;
  addMs_mmains!: Sequelize.HasManyAddAssociationsMixin<ms_mmain, ms_mmainId>;
  createMs_mmain!: Sequelize.HasManyCreateAssociationMixin<ms_mmain>;
  removeMs_mmain!: Sequelize.HasManyRemoveAssociationMixin<ms_mmain, ms_mmainId>;
  removeMs_mmains!: Sequelize.HasManyRemoveAssociationsMixin<ms_mmain, ms_mmainId>;
  hasMs_mmain!: Sequelize.HasManyHasAssociationMixin<ms_mmain, ms_mmainId>;
  hasMs_mmains!: Sequelize.HasManyHasAssociationsMixin<ms_mmain, ms_mmainId>;
  countMs_mmains!: Sequelize.HasManyCountAssociationsMixin;
  // ms_mparent hasMany roles_has_mchild via mparent_id
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
  // ms_mparent hasMany roles_has_mmain via mparent_id
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
  // ms_mparent hasMany roles_has_mparent via mparent_id
  roles_has_mparents!: roles_has_mparent[];
  getRoles_has_mparents!: Sequelize.HasManyGetAssociationsMixin<roles_has_mparent>;
  setRoles_has_mparents!: Sequelize.HasManySetAssociationsMixin<roles_has_mparent, roles_has_mparentId>;
  addRoles_has_mparent!: Sequelize.HasManyAddAssociationMixin<roles_has_mparent, roles_has_mparentId>;
  addRoles_has_mparents!: Sequelize.HasManyAddAssociationsMixin<roles_has_mparent, roles_has_mparentId>;
  createRoles_has_mparent!: Sequelize.HasManyCreateAssociationMixin<roles_has_mparent>;
  removeRoles_has_mparent!: Sequelize.HasManyRemoveAssociationMixin<roles_has_mparent, roles_has_mparentId>;
  removeRoles_has_mparents!: Sequelize.HasManyRemoveAssociationsMixin<roles_has_mparent, roles_has_mparentId>;
  hasRoles_has_mparent!: Sequelize.HasManyHasAssociationMixin<roles_has_mparent, roles_has_mparentId>;
  hasRoles_has_mparents!: Sequelize.HasManyHasAssociationsMixin<roles_has_mparent, roles_has_mparentId>;
  countRoles_has_mparents!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof ms_mparent {
    return ms_mparent.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    to_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ms_mparent',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "menus_header_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
