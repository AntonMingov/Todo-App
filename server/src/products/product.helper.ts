import { List } from "../db/models/list";

function AddProduct(productName: string) {
    return new Promise((resolve, reject) => {
        List.create({ name: productName }).then((response: any) => {
            resolve({ id: response.id, message: "Succesfully added!" })
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

function GetAllProducts() {
    return new Promise((resolve, reject) => {
        List.findAll({ attributes: ["id", "name"] }).then((products: { id: number, name: string }) => {
            resolve(products);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

function RemoveProduct(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
        List.destroy({ where: { id: id } })
            .then((count) => {
                if (count > 0) {
                    resolve("Product was deleted!");
                }
                else {
                    throw new Error("Product with this id doesn't exist!");
                }
            }).catch((err) => {
                reject(err);
            });
    });
}

export {
    AddProduct,
    GetAllProducts,
    RemoveProduct
}