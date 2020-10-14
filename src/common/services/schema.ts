import { schema } from 'normalizr';

export const user = new schema.Entity('users');
export const following = new schema.Entity('following');
export const followers = new schema.Entity('followers', {
    followers: user
});
export const reading = new schema.Entity('readings', {
    reader: user
});
export const subscriptions = new schema.Entity('subscriptions', {
    following: user
});
export const tags = new schema.Entity('tags');