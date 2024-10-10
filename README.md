# The Real Lobsters Compulsory Assignment

### Contributors
- **Jesper Nielsen** (jesnie02)
- **Jonas Speedtsberg** (jonas-stack)

## Project Overview

This school project for the 3´th semester in computer science is designed to meet a set of user stories aimed at providing both customers and business administrators with the tools to interact with a product and order system. The solution includes a PostgreSQL database, a .NET Web API backend, and a React frontend (Typescript).

---

## Setup & Installation

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/jesnie02/TheRealLobstersCompulsoryAssignment.git

## Setup database

1. Run the DataBaseInit.sql in the file system.
2. Then run the dataObjectsToDatabase.sql same place.

---

## User Stories

### For Customers:
- **Place Orders**: Customers can place an order with multiple products.
- **View Order History**: Customers can review their previous orders.
- **Product Overview**: Filter, sort, and search products using various criteria.

### For Business Administrators:
- **Manage Products**: Create, discontinue, and restock products.
- **View Customer Orders**: See the order history for all customers.
- **Custom Properties**: Add custom properties to paper products (e.g., water-resistant, sturdy).
- **Order Status Management**: Update the status of customer orders.

---

## Tech Stack

### Backend:
- **.NET Web API**: Server-side application built using C# and organized in Controllers.
- **Entity Framework**: Database interaction and data modeling.
- **xUnit**: Unit tests to ensure the reliability of the backend.
- **PostgreSQL**: Database schema designed for the product and order system. [Database schema file](https://gist.github.com/uldahlalex/47d380cd93d7ba62f4ccca43cb0b787a)

### Frontend:
- **React**: Client-side application.
- **Jotai**: State management for handling product and order states.
- **DaisyUI**: CSS framework for styling and UI components.

### DevOps:
- **GitHub Actions**: Automated tests using xUnit for continuous integration.




