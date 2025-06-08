import React, { useState } from "react";

const AdminProducts = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "Product A", price: 100, inventory: 50 },
        { id: 2, name: "Product B", price: 150, inventory: 0 },
    ]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        inventory: "",
    });
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddProduct = () => {
        setProducts([
            ...products,
            {
                ...newProduct,
                id: Date.now(),
                inventory: parseInt(newProduct.inventory) || "Unlimited",
            },
        ]);
        setNewProduct({ name: "", price: "", inventory: "" });
    };

    const handleEditProduct = (id) => {
        const updatedProducts = products.map((product) =>
            product.id === id ? { ...editingProduct } : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div className="p-4 max-w-[90%] mx-auto">
            <h2 className="text-3xl font-bold mb-6">Admin Products</h2>

            {/* Add Product */}
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-4">Add New Product</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="p-2 border border-gray-300 rounded"
                        value={newProduct.name}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, name: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        className="p-2 border border-gray-300 rounded"
                        value={newProduct.price}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Inventory Count (or leave blank for unlimited)"
                        className="p-2 border border-gray-300 rounded"
                        value={newProduct.inventory}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                inventory: e.target.value,
                            })
                        }
                    />
                </div>
                <button
                    onClick={handleAddProduct}
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Add Product
                </button>
            </div>

            {/* Product List */}
            <div>
                <h3 className="text-lg font-bold mb-4">Product List</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col bg-white"
                        >
                            <h4 className="text-xl font-semibold mb-2">
                                {editingProduct &&
                                editingProduct.id === product.id ? (
                                    <input
                                        type="text"
                                        className="p-2 border border-gray-300 rounded w-full"
                                        value={editingProduct.name}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    product.name
                                )}
                            </h4>
                            <p className="mb-2">
                                Price:{" "}
                                {editingProduct &&
                                editingProduct.id === product.id ? (
                                    <input
                                        type="number"
                                        className="p-2 border border-gray-300 rounded w-full"
                                        value={editingProduct.price}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                price: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    `$${product.price}`
                                )}
                            </p>
                            <p className="mb-4">
                                Inventory:{" "}
                                {editingProduct &&
                                editingProduct.id === product.id ? (
                                    <input
                                        type="number"
                                        className="p-2 border border-gray-300 rounded w-full"
                                        value={editingProduct.inventory}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                inventory: e.target.value,
                                            })
                                        }
                                    />
                                ) : product.inventory === "Unlimited" ? (
                                    "Unlimited"
                                ) : (
                                    product.inventory
                                )}
                            </p>
                            <div className="flex justify-between space-x-2">
                                {editingProduct &&
                                editingProduct.id === product.id ? (
                                    <button
                                        onClick={() =>
                                            handleEditProduct(product.id)
                                        }
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setEditingProduct(product)
                                        }
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        handleDeleteProduct(product.id)
                                    }
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
