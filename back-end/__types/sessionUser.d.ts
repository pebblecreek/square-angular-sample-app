export interface SessionUser {
	id: number;
	name: string;
	email: string;
	role: string;
	department: string;
	position: string;
	company: {
		id: number;
		name: string;
	};
	settings: {
		setting_code: string;
		value: string;
	};
}
export class filterTab {
	label: string;
	Id: string;
	count: number;
}