import { IdType } from '../shared/shared-types';
import SingleItem from '../components/SingleItem/SingleItem';
import { LogInUserType } from './userType';
// export interface Item {
//   id: IdType;
//   itemName: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   category: string;
//   size: string[];
//   itemsInStock: number | [];
//   numReviews?: number;
// }
export interface SingleItemType {
  _id: IdType;
  itemName: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  size: string[];
  itemsInStock: number;
  numReviews?: number;
}

export interface ItemAppState {
  loading: boolean;
  result: SingleItemType[];
  error?: string;
}

export interface ItemListener {
  (item: SingleItemType): void;
}

export interface Filter {
  category: string;
  price: string;
}

export interface ItemListProps {
  items: SingleItemType[];
  loading: boolean | undefined;
  error: string | undefined;
  filter: Filter;
  setFilter: any;
  filterState: boolean;
  setFilterState: any;
}

export interface ItemListActions {
  loading: boolean;
  result: SingleItemType[];
  error?: string;
}
export interface ItemDetailsState {
  loading: boolean;
  result: SingleItemType;
  error?: string;
}

export interface ItemDetailsActions {
  loading: boolean;
  result: SingleItemType;
  error?: string;
}

export interface ItemDeleteActions {
  loading: boolean;
  result: SingleItemType;
  error?: string;
  success?: boolean;
}
export interface ItemSaveState {
  loading: boolean;
  success?: boolean;
  result?: SingleItemType;
  error?: string;
}
export interface SaveItemRequest {
  itemName: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  size: string[];
  itemsInStock?: number;
  numReviews?: number;
}

export interface ItemActions {
  loading: boolean;
  userInfo?: LogInUserType;
  error?: string;
}