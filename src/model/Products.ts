import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Products extends Model {
  static table = 'products'

  
  @text('name') name: string
  @field('price') price: number
  @field('created_at') created_at: number
  @field('modified_at') modified_at: number
}