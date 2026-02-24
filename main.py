from fastapi import FastAPI
from models import Product

app = FastAPI()

@app.get("/")
def greet():
    return "Welcome to Product Management system"

products = [
    Product(id=1,name="phone",description="budget friendly phone", price=9900,quantity=10),
    Product(id=2,name="laptop",description="Dell Laptop", price=99000,quantity=5),
    Product(id=3,name="lipstick",description="Swiss beauty lipstick", price=300,quantity=20),
    Product(id=4,name="shirt",description="Rare rabbit shirt", price=1000,quantity=15),
]

@app.get("/products")
def get_all_products():
    return products

@app.get("/product/{id}")
def get_one_product(id : int):
    for product in products:
        if product.id == id:
            return product
        
    return "product not found!!!"

@app.post("/product")
def add_product(product : Product):
    products.append(product)
    return product

@app.put("/product/{id}")
def update_product(id : int, product : Product):
    for i in range(len(products)):
        if products[i].id == id:
            products[i] = product
            return "Product updated successfully!!"
    return "failed to update product!"

@app.delete("/product/{id}")
def delete_product(id : int):
    for i in range(len(products)):
        if products[i].id == id:
            del products[i]
            return "Product deleted successfully!!"
    return "Product not found!!!"