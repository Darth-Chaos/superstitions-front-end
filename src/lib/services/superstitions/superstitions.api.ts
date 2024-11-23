import axios from 'axios';

import type { CreateSuperstition, UpdateSuperstition, Superstition } from './superstition';
import type { SingleEntity } from '../entities/single_entity';

export class SuperstitionService {
	private apiBaseUrl = 'http://localhost:3000/api/v2';
	private api = axios.create({
		baseURL: this.apiBaseUrl,
		timeout: 10000
	});

	async getSuperstitions(search: string = ''): Promise<SingleEntity<Superstition>> {
		try {
			const response = await this.api.get<SingleEntity<Superstition>>('/superstitions', {
				params: { search }
			});
			return response.data;
		} catch (error) {
			console.error('Error fetching regions:', error);
			throw error;
		}
	}

	async createSuperstition(newSuperstition: CreateSuperstition): Promise<Superstition> {
		try {
			const response = await this.api.post('/superstitions', newSuperstition);
			return response.data;
		} catch (error) {
			console.error('Error creating superstition:', error);
			throw error;
		}
	}

	async updateSuperstition(superstition: UpdateSuperstition): Promise<Superstition> {
		try {
			const response = await this.api.put(`/superstitions/${superstition._id}`, superstition);
			return response.data;
		} catch (error) {
			console.error('Error updating superstition:', error);
			throw error;
		}
	}

	async deleteSuperstition(superstitionId: string): Promise<void> {
		try {
			await this.api.delete(`/superstitions/${superstitionId}`);
		} catch (error) {
			console.error('Error deleting superstition:', error);
			throw error;
		}
	}
}
