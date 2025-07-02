import { properties } from '@/services/mockData/properties';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  async getAll() {
    await delay(300);
    return [...properties];
  },

  async getById(id) {
    await delay(200);
    const property = properties.find(p => p.Id === id);
    if (!property) {
      throw new Error('Property not found');
    }
    return { ...property };
  },

  async create(propertyData) {
    await delay(400);
    const newId = Math.max(...properties.map(p => p.Id)) + 1;
    const newProperty = {
      Id: newId,
      ...propertyData,
      createdAt: new Date().toISOString()
    };
    properties.push(newProperty);
    return { ...newProperty };
  },

  async update(id, updates) {
    await delay(300);
    const index = properties.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    properties[index] = { ...properties[index], ...updates };
    return { ...properties[index] };
  },

  async delete(id) {
    await delay(200);
    const index = properties.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    properties.splice(index, 1);
    return true;
  }
};