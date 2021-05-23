import  * as mongoose  from 'mongoose';




import {Schema,Document} from 'mongoose'
// eslint-disable-next-line @typescript-eslint/interface-name-prefix

import {IProduct } from "./product"
export let ObjectId = mongoose.Schema.Types.ObjectId;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
 export interface IProductVariant extends mongoose.Document {
    product: IProduct["_id"] ;
    price: number;
    attrs: [{
        name: string;
        value: string;
    }];
  }

  const ProductVariantSchema=  new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    price: {
        type: Number,
        required: true,
    },
    attrs: [{
        name:String,
        value:String
    }]
  })


  export const  ProductVariantModel = mongoose.model<IProductVariant>('ProductVariant',ProductVariantSchema );




