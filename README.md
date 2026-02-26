# Product Management System API

This is a **Product Management System** built using **FastAPI** for the backend and **Next.js + TypeScript + Tailwind CSS** for the frontend.  

It provides:

- View all products  
- Add new products  
- Edit existing products  
- Delete products  
- Search products with debouncing/throttling  
- Ready for unit tests with pytest  

---

## Features

- List all products in a table  
- Add, edit, delete products  
- Search products by name or description  
- Responsive frontend UI with Tailwind CSS  
- Debounced search input for optimal API usage  
- Clean project structure for scalability  

---

## Tech Stack

| Tool            | Purpose                   |
|-----------------|---------------------------|
| FastAPI         | Backend framework         |
| SQLAlchemy      | ORM for database access   |
| SQLite          | Default DB (switchable)   |
| Pydantic        | Request/response schemas  |
| Uvicorn         | ASGI server               |
| Next.js         | Frontend framework        |
| TypeScript      | Static typing             |
| Tailwind CSS    | Styling framework         |
| pytest          | Backend testing           |

---

## Project Structure

### Backend

```

backend/
├── main.py             # FastAPI entrypoint and routes
├── database.py         # SQLAlchemy engine & session
├── database_models.py  # SQLAlchemy Product model
├── models.py           # Pydantic Product schema
└── requirements.txt    # Dependencies

```

### Frontend

```

frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page (list & search products)
│   │   ├── add_product/page.tsx  # Add Product page
│   │   └── edit_product/[id]/page.tsx # Edit Product page
│   ├── components/
│   │   └── ProductCard.tsx       # Optional reusable card
│   ├── lib/
│   │   └── api.ts                # API base URL
│   ├── types/
│   │   └── product.ts            # Product TypeScript type
│   └── styles/
│       └── Home.module.css       # CSS for Home page
└── package.json

````

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/product-management-system.git
cd product-management-system
````

### 2. Backend Setup

1. Create virtual environment:

```bash
python -m venv venv
source venv/bin/activate      # Linux/macOS
venv\Scripts\activate         # Windows
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run FastAPI server:

```bash
uvicorn main:app --reload
```

Backend will run at `http://127.0.0.1:8000`

---

### 3. Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run Next.js development server:

```bash
npm run dev
```

Frontend will run at `http://localhost:3000`

---

## API Endpoints

| Endpoint      | Method | Description                            |
| ------------- | ------ | -------------------------------------- |
| /products     | GET    | Get all products (optional `?search=`) |
| /product/{id} | GET    | Get a product by ID                    |
| /product      | POST   | Add a new product                      |
| /product/{id} | PUT    | Update a product by ID                 |
| /product/{id} | DELETE | Delete a product by ID                 |

**Example Search Request:**

```http
GET /products?search=phone
```

---

## Frontend Pages

| Page              | Route                | Description                |
| ----------------- | -------------------- | -------------------------- |
| Home Page         | `/`                  | List products + search bar |
| Add Product Page  | `/add_product`       | Add a new product          |
| Edit Product Page | `/edit_product/[id]` | Edit an existing product   |

---

## Search Functionality

* Input uses **debouncing** (500ms) to reduce unnecessary API calls
* Fetches filtered products from backend based on **name** or **description**
* Supports throttling concept for better performance in future

---

## Testing

* Backend APIs can be tested using **Postman**, **Insomnia**, or automated **pytest** scripts

Example:

```bash
pytest --cov=backend --cov-report=term
```

---

## Future Improvements

* Add **Redis caching** for faster search
* Pagination and sorting for large datasets
* User authentication & role-based access
* Modal-based forms for better UX
* Full-text search for advanced filtering

---

## License

Open-source & free to use.

---

## Author

**Vaishnavi Joshi**
