import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Customers extends Model {
  static table = 'customers'

  
  @text('name') name: string
  @text('phone') phone: string
  @text('address') address: string
  @text('email') email: string
  @field('created_at') created_at: number
  @field('modified_at') modified_at: number
}