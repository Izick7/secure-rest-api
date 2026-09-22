const express = require("express");

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();


router.get("/", authenticate, getProducts);


router.post(
    "/",
    authenticate,
    authorize("admin"),
    createProduct
);

router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    updateProduct
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    deleteProduct
);

module.exports = router;