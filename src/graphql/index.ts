import { IProductVariant } from './../model/ProductVapis';
import { CreateProductMutationArgs, ProductVariant } from './../types/graph.d';
import { ObjectId } from 'mongodb';
import { IResolvers } from 'apollo-server-express';
import slug from 'slug'


import {Product} from'../model/product'
import {ProductVariantModel} from'../model/ProductVapis'

export const resolvers: IResolvers = {
    Mutation: {
    createProduct: async (
        _root: undefined,
        { input }: CreateProductMutationArgs,
      ): Promise<ProductVariant> => {
        
        const {attrs,products ,price} = input;
try {
    

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newProduct= new Product({
        name:products.name,
        slug:slug(products.name,'_'),
        description:products.description

    })
     // eslint-disable-next-line @typescript-eslint/camelcase
     await newProduct.save();



    let newarr=attrs?attrs:[]

    const insertRes = new  ProductVariantModel({
          attrs:newarr,
          price,
          product:newProduct._id
      });
        const res=await (insertRes.save());
        return res as ProductVariant;
} catch (e) {
        throw new Error(`ther are some thing issuie in the createProduct Mutation in insert new Product ${e}`)

}

      }}
      ,Query:{
        products:async (_root: undefined): Promise<ProductVariant[] | null> => {
              try {
                  const allProduct=await ProductVariantModel.find({})
                  if(!allProduct){
                    return  null
                  }

                
                return allProduct as ProductVariant[]


              
              } catch (e) {
                throw new Error(`ther are some thing issuie in the products Query in insert new Product ${e}`)

              }

        }
                }
              ,
              ProductVariant:{
                product: async(parent, __, {})=> {
                  return await ProductVariantModel.findOne({id: parent.id})
                }
                

              }
            
            }
