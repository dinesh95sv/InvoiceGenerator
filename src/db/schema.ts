import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'customers',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'gstin', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'address', type: 'string', isOptional: true },
        { name: 'email', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'modified_at', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'products',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'price', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'modified_at', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'factories',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'gstin', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'address', type: 'string', isOptional: true },
        { name: 'email', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'modified_at', type: 'number' }
      ]
    }),
  ]
})