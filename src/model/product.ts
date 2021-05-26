import  * as mongoose  from 'mongoose';

import {Schema,Document} from 'mongoose'
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
 export interface IProduct extends mongoose.Document {
    name: string;
    slug: string;
    description: string;
  }

  const ProductSchema=  new Schema({
    name: {
        type: String,
        required: true
   },
      slug:{type:String,},
      description:{
          type:String,
        required: true
    },
  })


  export const  Product = mongoose.model<IProduct>('Product',ProductSchema );




