import { Request, Response, NextFunction } from 'express';
import * as productHelper from "../products/product.helper";

function AddProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const { productName } = req.body;

        productHelper.AddProduct(productName).then((response: string) => {
            return res.status(200).json(response);
        }, (err: Error) => {
            res.status(500).json('Something went wrong with the adding of the product!');
        });
    } catch (error) {
        res.status(500).json('Something went wrong with the adding of the product!');
    }
}

function GetAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
        productHelper.GetAllProducts().then((response: string) => {
            return res.status(200).json(response);
        }, (err: Error) => {
            res.status(500).json('Something went wrong with the getting of the products!');
        });

    } catch (error) {
        res.status(500).json('Something went wrong with the getting of the products!');
    }
}

function RemoveProduct(req: Request, res: Response, next: NextFunction) {

    const { id } = req.body;

    try {
        productHelper.RemoveProduct(id).then((response: string) => {
            return res.status(200).json(response);
        }, (err: Error) => {
            res.status(500).json('Something went wrong with the deleting the product!');
        });
    } catch (error) {
        res.status(500).json('Something went wrong with the deleting the product!');
    }
}

export {
    AddProduct,
    GetAllProducts,
    RemoveProduct
}