export const typeDefs = ["\r\n type Product {\r\n    id: ID!\r\n    name: String!\r\n    slug: String!\r\n    description:String!\r\n    \r\n  }\r\n\r\n  type AttrsProduct{\r\n  name:String!\r\n  value:String!\r\n\r\n}\r\n\r\n  type  ProductVariant {\r\n  id: ID!\r\n  product: Product!\r\n  price: Int!\r\n  attrs: [AttrsProduct]\r\n}\r\n\r\ntype Query {\r\n        products:[ProductVariant]\r\n        # product(id:ID!):Product!\r\n\r\n\r\n}\r\n\r\ninput ProductInput{\r\n name: String!\r\n    description:String!\r\n    }\r\ninput CreateProductInput {\r\n    products:ProductInput!\r\n    attrs:[AttrsInput!]!\r\n    price:Int!\r\n\r\n\r\n}\r\ninput AttrsInput {\r\n    name:String!\r\n  value:String!\r\n}\r\n\r\n\r\ntype Mutation {\r\n        createProduct(input:CreateProductInput!):ProductVariant!\r\n\r\n  \r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"];
/* tslint:disable */

export interface Query {
  products: Array<ProductVariant> | null;
}

export interface ProductVariant {
  id: string;
  product: Product;
  price: number;
  attrs: Array<AttrsProduct> | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface AttrsProduct {
  name: string;
  value: string;
}

export interface Mutation {
  createProduct: ProductVariant;
}

export interface CreateProductMutationArgs {
  input: CreateProductInput;
}

export interface CreateProductInput {
  products: ProductInput;
  attrs: Array<AttrsInput>;
  price: number;
}

export interface ProductInput {
  name: string;
  description: string;
}

export interface AttrsInput {
  name: string;
  value: string;
}
