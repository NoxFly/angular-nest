export class Entity {
    public constructor(data: Partial<Entity>) {
        Object.assign(this, data);
    }
}
