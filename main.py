from fastapi import Depends,FastAPI
from models import Product
from database import session
import database_models
from database import engine
from sqlalchemy.orm import Session

app = FastAPI()

database_models.Base.metadata.create_all(bind=engine)

@app.get("/")
def greet():
    return "Welcome to Product Management system"

products = [
    Product(id=1,name="phone",description="budget friendly phone", price=9900,quantity=10),
    Product(id=2,name="laptop",description="Dell Laptop", price=99000,quantity=5),
    Product(id=3,name="lipstick",description="Swiss beauty lipstick", price=300,quantity=20),
    Product(id=4,name="shirt",description="Rare rabbit shirt", price=1000,quantity=15),
]

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

def init_db():
    
    db = session()
    
    count = db.query(database_models.Product).count
    
    if count == 0 :
        for product in products:
            db.add(database_models.Product(**product.model_dump()))
    db.commit()
    
init_db()

@app.get("/products")
def get_all_products(db : Session= Depends(get_db)):
    # db connection
    db_products = db.query(database_models.Product).all()
    return db_products

@app.get("/product/{id}")
def get_one_product(id : int, db : Session = Depends(get_db)):
    # for product in products:
    #     if product.id == id:
    #         return product 
    db_product = db.query(database_models.Product).filter(database_models.Product.id == id).first()
    if db_product:
        return db_product
    return "product not found!!!"

@app.post("/product")
def add_product(product : Product, db : Session = Depends(get_db)):
    # products.append(product)
    db.add(database_models.Product(**product.model_dump()))
    db.commit()
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