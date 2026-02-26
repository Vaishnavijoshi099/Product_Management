```markdown
# Product Management System

A full-stack **Product Management System** built using **FastAPI** for the backend and **Next.js with TypeScript and Tailwind CSS** for the frontend.  
It allows users to **view, add, edit, delete, and search products**.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup Instructions](#setup-instructions)  
- [Backend API Endpoints](#backend-api-endpoints)  
- [Frontend Pages](#frontend-pages)  
- [Search Functionality](#search-functionality)  
- [Future Improvements](#future-improvements)  

---

## Features

- List all products in a table  
- Add, edit, and delete products  
- Search products by name or description  
- Responsive frontend using Tailwind CSS  
- Debounced search to optimize API calls  

---

## Tech Stack

**Backend:**  
- Python 3.11+  
- FastAPI  
- SQLAlchemy  
- SQLite/MySQL/PostgreSQL (any SQL database)  

**Frontend:**  
- Next.js 14+ (App Router)  
- TypeScript  
- Tailwind CSS  

---

## Project Structure

### Backend

```

backend/
│
├── database.py          # SQLAlchemy session & engine
├── database_models.py   # SQLAlchemy Product model
├── models.py            # Pydantic Product schema
└── main.py              # FastAPI app with all routes

```

### Frontend

```

frontend/
│
├── src/
│   ├── app/
│   │   └── page.tsx          # Home page (list & search products)
│   │   └── add_product/
│   │       └── page.tsx      # Add Product page
│   │   └── edit_product/
│   │       └── [id]/page.tsx # Edit Product page
│   ├── components/
│   │   └── ProductCard.tsx    # Optional reusable card component
│   ├── lib/
│   │   └── api.ts             # API base URL
│   ├── types/
│   │   └── product.ts         # TypeScript Product type
│   └── styles/
│       └── Home.module.css    # CSS for Home page
└── package.json

````

---

## Setup Instructions

### Backend

1. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate      # Windows
````

2. Install dependencies:

```bash
pip install fastapi uvicorn sqlalchemy pydantic
```

3. Run the backend server:

```bash
uvicorn main:app --reload
```

> The backend will run at `http://127.0.0.1:8000`

---

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the Next.js development server:

```bash
npm run dev
```

> Frontend will run at `http://localhost:3000`

---

## Backend API Endpoints

| Method | Endpoint      | Description                                     |
| ------ | ------------- | ----------------------------------------------- |
| GET    | /products     | Get all products (with optional `search` query) |
| GET    | /product/{id} | Get one product by ID                           |
| POST   | /product      | Add a new product                               |
| PUT    | /product/{id} | Update a product by ID                          |
| DELETE | /product/{id} | Delete a product by ID                          |

**Search Example:**

```http
GET /products?search=phone
```

---

## Frontend Pages

| Page              | Route                | Description                      |
| ----------------- | -------------------- | -------------------------------- |
| Home Page         | `/`                  | List products with search bar    |
| Add Product Page  | `/add_product`       | Form to add a new product        |
| Edit Product Page | `/edit_product/[id]` | Form to edit an existing product |

---

## Search Functionality

* Search bar is implemented with **debouncing** (500ms delay).
* Backend filters products by **name** (or optionally description) using `ILIKE`.
* Reduces unnecessary API calls while typing.

---

## Future Improvements

* Implement **Redis caching** for search results
* Add **pagination** and **sorting**
* Add **user authentication**
* Integrate **full-text search** for large datasets
* Improve **UI/UX** with modal forms or reusable components

---

## License

This project is open-source and free to use.

---

## Author

Vaishnavi Joshi

