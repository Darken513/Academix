import { Rooms } from '../models/Room';
import { DATA_SOURCE } from './dataSource';

async function createRoom() {
    const roomsRepository = DATA_SOURCE.getRepository(Rooms);
    const newRoom = roomsRepository.create({
        name: 'Room A',
        capacity: 20,
        enabled: true,
    });
    await roomsRepository.save(newRoom);
}


export async function createFakeDB() {
    await createRoom();
}