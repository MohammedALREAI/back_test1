import { Collection, ObjectId } from "mongodb";



export interface Product {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
 
}
export interface AttrsProduct {
  name: string;
  value: string;
  

}


export interface ProductVariant {
  _id: ObjectId;
  product: ObjectId[];
  price: number;
  attrs: AttrsProduct[];
}


