import { schema } from 'normalizr';

export const user = new schema.Entity('users');
export const reading = new schema.Entity('readings', {
    reader: user
});