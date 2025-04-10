import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Factories extends Model {
  static table = 'factories'

  
  @text('name') name: string
  @text('phone') phone: string
  @text('gstin') gstin: string
  @text('address') address: string
  @text('email') email: string
  @field('created_at') created_at: number
  @field('modified_at') modified_at: number
}