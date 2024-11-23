import type { Region } from '../regions/regions';
import type { Source } from './source';

export interface Superstition {
	_id: string;
	name: string;
	origin: string;
	description?: string;
	positive_effect: boolean;
	origin_date?: Date;
	region_id: Region;
	sources?: Source[];
	created_at?: Date;
}

export interface CreateSuperstition {
	name: string;
	origin: string;
	description?: string;
	positive_effect: boolean;
	origin_date?: Date;
	region_id: string;
	sources?: Source[];
	created_at?: Date;
}

export interface UpdateSuperstition {
	_id: string;
	name?: string;
	origin?: string;
	description?: string;
	positive_effect?: boolean;
	origin_date?: Date;
	region_id?: string;
	sources?: Source[];
	created_at?: Date;
}
