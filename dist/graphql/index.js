"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const slug_1 = __importDefault(require("slug"));
const product_1 = require("../model/product");
const ProductVapis_1 = require("../model/ProductVapis");
exports.resolvers = {
    Mutation: {
        createProduct: (_root, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const { attrs, products, price } = input;
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const newProduct = new product_1.Product({
                    name: products.name,
                    slug: slug_1.default(products.name, '_'),
                    description: products.description
                });
                // eslint-disable-next-line @typescript-eslint/camelcase
                yield newProduct.save();
                let newarr = attrs ? attrs : [];
                const insertRes = new ProductVapis_1.ProductVariantModel({
                    attrs: newarr,
                    price,
                    product: newProduct._id
                });
                const res = yield (insertRes.save());
                return res;
            }
            catch (e) {
                throw new Error(`ther are some thing issuie in the createProduct Mutation in insert new Product ${e}`);
            }
        })
    },
    Query: {
        products: (_root) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const allProduct = yield ProductVapis_1.ProductVariantModel.find({});
                if (!allProduct) {
                    return null;
                }
                return allProduct;
            }
            catch (e) {
                throw new Error(`ther are some thing issuie in the products Query in insert new Product ${e}`);
            }
        })
    },
    ProductVariant: {
        id: ({ id }) => {
            return id;
        },
        product: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const re = yield product_1.Product.findOne({ id: parent.product });
            if (!re) {
                return null;
            }
            return re;
        })
    },
};
