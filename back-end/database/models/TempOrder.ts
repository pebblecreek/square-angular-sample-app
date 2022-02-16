import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
	tableName: 'tempOrders',
	paranoid: true,
	underscored: true
})
export class TempOrder extends Model {
	@AutoIncrement
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		field: 'id'
	})
	id: number;

	@Column({
		type: DataType.STRING(150),
		field: 'order_id'
	})
	order_id: string;

	@Column({
		type: DataType.STRING(150),
		field: 'customer_id'
	})
	customer_id: string;
}