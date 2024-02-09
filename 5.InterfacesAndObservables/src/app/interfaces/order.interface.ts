import { Item } from './item.interface';

export interface Order {
  id: string;
  customerId: string;
  items: Item[];
  total: number;
  date: Date;
  status: string;
}
