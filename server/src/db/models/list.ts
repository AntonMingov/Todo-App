import { Model, Column, Table, AllowNull, PrimaryKey, DataType, AutoIncrement } from "sequelize-typescript";

@Table({
  tableName: 'tbl_list'
})
export class List extends Model<List> {

  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;
}
