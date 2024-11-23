export interface SingleEntity<T> {
	data: Array<T>;
	total: number;
	page: number;
	lastPage: number;
}
