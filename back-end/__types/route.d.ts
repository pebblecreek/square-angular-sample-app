export interface route {
	path: string;
	method: string;
	function: Function;
	uploader?: Function;
	private: Boolean;
	role?: string[];
}