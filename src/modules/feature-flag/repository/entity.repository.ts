import { Inject, Injectable } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AdapterConstant } from 'src/common';
import { Entity, NewEntity } from 'src/modules/database/schema';
import { entities } from 'src/modules/database/schema/tables/entity';

@Injectable()
export class EntityRepository {
    constructor(
        @Inject(AdapterConstant.DRIZZLE_ORM) private database: NodePgDatabase,
    ) {}

    async insert(newEntity: NewEntity): Promise<Entity> {
        const [entity] = await this.database
            .insert(entities)
            .values(newEntity)
            .returning();
        return entity;
    }

    async upsert(newEntity: NewEntity): Promise<Entity> {
        const [oldEntity] = await this.database
            .select()
            .from(entities)
            .where(
                and(
                    eq(entities.idendifierId, newEntity.idendifierId),
                    eq(entities.role, newEntity.role),
                    eq(entities.applicationId, newEntity.applicationId),
                ),
            )
            .limit(1);
        if (oldEntity) {
            // Update existing entity
            const [updatedEntity] = await this.database
                .update(entities)
                .set({
                    ...newEntity,
                })
                .where(eq(entities.id, oldEntity.id))
                .returning();

            return updatedEntity;
        } else {
            // Insert new entity
            const [insertedEntity] = await this.database
                .insert(entities)
                .values({
                    ...newEntity,
                })
                .returning();

            return insertedEntity;
        }
    }
}
