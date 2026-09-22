const products = require("../data/products");

const getProducts = (req, res) => {
    return res.status(200).json({
        products
    });
};

const createProduct = (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !description || price === undefined) {
        return res.status(400).json({
            message: "Name, description and price are required"
        });
    }

    if (typeof price !== "number" || price < 0) {
        return res.status(400).json({
            message: "Price must be a valid positive number"
        });
    }

    const newProduct = {
        id: products.length + 1,
        name: name.trim(),
        description: description.trim(),
        price
    };

    products.push(newProduct);

    return res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    });
};

const updateProduct = (req, res) => {
    const productId = Number(req.params.id);

    const product = products.find(
        product => product.id === productId
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, description, price } = req.body;

    if (name !== undefined) {
        product.name = name.trim();
    }

    if (description !== undefined) {
        product.description = description.trim();
    }

    if (price !== undefined) {
        if (typeof price !== "number" || price < 0) {
            return res.status(400).json({
                message: "Price must be a valid positive number"
            });
        }

        product.price = price;
    }

    return res.status(200).json({
        message: "Product updated successfully",
        product
    });
};

const deleteProduct = (req, res) => {
    const productId = Number(req.params.id);

    const productIndex = products.findIndex(
        product => product.id === productId
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.splice(productIndex, 1);

    return res.status(200).json({
        message: "Product deleted successfully"
    });
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};