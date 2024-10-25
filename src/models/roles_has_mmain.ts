import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ms_mmain, ms_mmainId } from './ms_mmain';
import type { ms_mparent, ms_mparentId } from './ms_mparent';
import type { ms_roles, ms_rolesId } from './ms_roles';
import type { roles_has_mchild, roles_has_mchildId } from './roles_has_mchild';
import type { roles_has_mparent, roles_has_mparentId } from './roles_has_mparent';

export interface roles_has_mmainAttributes {
  id: number;
  role_id: number;
  mparent_id: number;
  mmain_id: number;
  role_parent_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type roles_has_mmainPk = "id";
export type roles_has_mmainId = roles_has_mmain[roles_has_mmainPk];
export type roles_has_mmainOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type roles_has_mmainCreationAttributes = Optional<roles_has_mmainAttributes, roles_has_mmainOptionalAttributes>;

export class roles_has_mmain extends Model<roles_has_mmainAttributes, roles_has_mmainCreationAttributes> implements roles_has_mmainAttributes {
  id!: number;
  role_id!: number;
  mparent_id!: number;
  mmain_id!: number;
  role_parent_id!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // roles_has_mmain belongsTo ms_mmain via mmain_id
  mmain!: ms_mmain;
  getMmain!: Sequelize.BelongsToGetAssociationMixin<ms_mmain>;
  setMmain!: Sequelize.BelongsToSetAssociationMixin<ms_mmain, ms_mmainId>;
  createMmain!: Sequelize.BelongsToCreateAssociationMixin<ms_mmain>;
  // roles_has_mmain belongsTo ms_mparent via mparent_id
  mparent!: ms_mparent;
  getMparent!: Sequelize.BelongsToGetAssociationMixin<ms_mparent>;
  setMparent!: Sequelize.BelongsToSetAssociationMixin<ms_mparent, ms_mparentId>;
  createMparent!: Sequelize.BelongsToCreateAssociationMixin<ms_mparent>;
  // roles_has_mmain belongsTo ms_roles via role_id
  role!: ms_roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<ms_roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<ms_roles, ms_rolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<ms_roles>;
  // roles_has_mmain hasMany roles_has_mchild via role_main_id
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
  // roles_has_mmain belongsTo roles_has_mparent via role_parent_id
  role_parent!: roles_has_mparent;
  getRole_parent!: Sequelize.BelongsToGetAssociationMixin<roles_has_mparent>;
  setRole_parent!: Sequelize.BelongsToSetAssociationMixin<roles_has_mparent, roles_has_mparentId>;
  createRole_parent!: Sequelize.BelongsToCreateAssociationMixin<roles_has_mparent>;

  static initModel(sequelize: Sequelize.Sequelize): typeof roles_has_mmain {
    return roles_has_mmain.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ms_roles',
        key: 'id'
      }
    },
    mparent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ms_mparent',
        key: 'id'
      }
    },
    mmain_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ms_mmain',
        key: 'id'
      }
    },
    role_parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles_has_mparent',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'roles_has_mmain',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "roles_has_mparent_pk_1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
