import axios from 'axios';

import type { Region } from './regions';
import type { SingleEntity } from '../entities/single_entity';

export class RegionsService {
	private apiBaseUrl = 'http://localhost:3000/api/v2';
	private api = axios.create({
		baseURL: this.apiBaseUrl,
		timeout: 10000
	});

	async getRegions(): Promise<SingleEntity<Region>> {
		try {
			const response = await this.api.get<SingleEntity<Region>>('/regions');
			return response.data;
		} catch (error) {
			console.error('Error fetching regions:', error);
			throw error;
		}
	}
}
