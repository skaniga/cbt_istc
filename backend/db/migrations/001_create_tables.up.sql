-- Users table
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DOUBLE PRECISION NOT NULL,
  category VARCHAR(100) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  total_amount DOUBLE PRECISION NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id),
  product_id BIGINT NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DOUBLE PRECISION NOT NULL
);

-- Cart items table
CREATE TABLE cart_items (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  product_id BIGINT NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Insert sample products
INSERT INTO products (name, description, price, category, stock_quantity, image_url) VALUES
('Gaming Laptop RTX 4070', 'High-performance gaming laptop with RTX 4070 graphics', 1299.99, 'laptops', 15, '/images/gaming-laptop.jpg'),
('Office Desktop i7', 'Professional desktop computer with Intel i7 processor', 899.99, 'desktops', 20, '/images/office-desktop.jpg'),
('Gaming Mouse RGB', 'High-precision gaming mouse with RGB lighting', 59.99, 'accessories', 50, '/images/gaming-mouse.jpg'),
('Mechanical Keyboard', 'RGB mechanical keyboard with blue switches', 129.99, 'accessories', 30, '/images/mechanical-keyboard.jpg'),
('32GB DDR4 RAM', 'High-speed 32GB DDR4 memory kit', 189.99, 'components', 25, '/images/ram-kit.jpg'),
('RTX 4080 Graphics Card', 'NVIDIA GeForce RTX 4080 graphics card', 1199.99, 'components', 8, '/images/rtx-4080.jpg'),
('Ultrabook 14"', 'Thin and light ultrabook for productivity', 799.99, 'laptops', 12, '/images/ultrabook.jpg'),
('Workstation Desktop', 'High-end workstation for professional use', 2499.99, 'desktops', 5, '/images/workstation.jpg');
