import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ms_mchild, ms_mchildId } from './ms_mchild';
import type { ms_mmain, ms_mmainId } from './ms_mmain';
import type { ms_mparent, ms_mparentId } from './ms_mparent';
import type { ms_roles, ms_rolesId } from './ms_roles';
import type { roles_has_mmain, roles_has_mmainId } from './roles_has_mmain';
import type { roles_has_mparent, roles_has_mparentId } from './roles_has_mparent';

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

  // roles_has_mchild belongsTo ms_mchild via mchild_id
  mchild!: ms_mchild;
  getMchild!: Sequelize.BelongsToGetAssociationMixin<ms_mchild>;
  setMchild!: Sequelize.BelongsToSetAssociationMixin<ms_mchild, ms_mchildId>;
  createMchild!: Sequelize.BelongsToCreateAssociationMixin<ms_mchild>;
  // roles_has_mchild belongsTo ms_mmain via mmain_id
  mmain!: ms_mmain;
  getMmain!: Sequelize.BelongsToGetAssociationMixin<ms_mmain>;
  setMmain!: Sequelize.BelongsToSetAssociationMixin<ms_mmain, ms_mmainId>;
  createMmain!: Sequelize.BelongsToCreateAssociationMixin<ms_mmain>;
  // roles_has_mchild belongsTo ms_mparent via mparent_id
  mparent!: ms_mparent;
  getMparent!: Sequelize.BelongsToGetAssociationMixin<ms_mparent>;
  setMparent!: Sequelize.BelongsToSetAssociationMixin<ms_mparent, ms_mparentId>;
  createMparent!: Sequelize.BelongsToCreateAssociationMixin<ms_mparent>;
  // roles_has_mchild belongsTo ms_roles via role_id
  role!: ms_roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<ms_roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<ms_roles, ms_rolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<ms_roles>;
  // roles_has_mchild belongsTo roles_has_mmain via role_main_id
  role_main!: roles_has_mmain;
  getRole_main!: Sequelize.BelongsToGetAssociationMixin<roles_has_mmain>;
  setRole_main!: Sequelize.BelongsToSetAssociationMixin<roles_has_mmain, roles_has_mmainId>;
  createRole_main!: Sequelize.BelongsToCreateAssociationMixin<roles_has_mmain>;
  // roles_has_mchild belongsTo roles_has_mparent via role_parent_id
  role_parent!: roles_has_mparent;
  getRole_parent!: Sequelize.BelongsToGetAssociationMixin<roles_has_mparent>;
  setRole_parent!: Sequelize.BelongsToSetAssociationMixin<roles_has_mparent, roles_has_mparentId>;
  createRole_parent!: Sequelize.BelongsToCreateAssociationMixin<roles_has_mparent>;

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
    },
    mchild_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ms_mchild',
        key: 'id'
      }
    },
    role_main_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles_has_mmain',
        key: 'id'
      }
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
