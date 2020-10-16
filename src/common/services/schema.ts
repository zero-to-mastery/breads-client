import { schema } from 'normalizr';

export const user: schema.Entity<string> = new schema.Entity('users');
export const following: schema.Entity<string> = new schema.Entity('following');
export const followers: schema.Entity<any> = new schema.Entity('followers', {
    followers: user
});
export const reading: schema.Entity<any> = new schema.Entity('readings', {
    reader: user
});
export const subscriptions: schema.Entity<any> = new schema.Entity('subscriptions', {
    following: user
});
export const tags: schema.Entity<string> = new schema.Entity('tags');