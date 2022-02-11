import { AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
	tableName: 'tokendata',
	paranoid: true,
	underscored: true
})
export class Tokendata extends Model {
	@AutoIncrement
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		field: 'id'
	})
	id: number;
	
	@Column({
		type: DataType.STRING(150),
		field: 'key'
	})
	key: string;

	@Column({
		type: DataType.TEXT,
		field: 'val'
	})
	val: string;
}