import { bookings } from '@/services/mockData/bookings';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bookingService = {
  async getAll() {
    await delay(250);
    return [...bookings];
  },

  async getById(id) {
    await delay(200);
    const booking = bookings.find(b => b.Id === id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return { ...booking };
  },

  async create(bookingData) {
    await delay(500);
    const newId = Math.max(...bookings.map(b => b.Id)) + 1;
    const newBooking = {
      Id: newId,
      ...bookingData,
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    return { ...newBooking };
  },

  async update(id, updates) {
    await delay(300);
    const index = bookings.findIndex(b => b.Id === id);
    if (index === -1) {
      throw new Error('Booking not found');
    }
    bookings[index] = { ...bookings[index], ...updates };
    return { ...bookings[index] };
  },

  async delete(id) {
    await delay(200);
    const index = bookings.findIndex(b => b.Id === id);
    if (index === -1) {
      throw new Error('Booking not found');
    }
    bookings.splice(index, 1);
    return true;
  }
};