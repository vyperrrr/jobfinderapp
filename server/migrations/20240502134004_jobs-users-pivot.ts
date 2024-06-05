import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('jobs_users', (table) => {
    table.primary(['userId', 'jobId'])

    table.bigint('userId').references('id').inTable('users').onDelete('CASCADE')
    table.bigint('jobId').references('id').inTable('jobs').onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('jobs_users')
}
