export interface Region {
	_id: string;
	region_name: string;
	countries: Array<{ name: string }>;
}
