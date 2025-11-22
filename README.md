# 🛍️ E-Commerce Application

A full-featured, production-ready e-commerce web application built with Next.js, TypeScript, TailwindCSS, and Supabase.

## ✨ Features

### User Features
- 🔐 **Authentication**: Email/password registration and login with Supabase Auth
- 👤 **User Profiles**: Manage personal information and view order history
- 🛒 **Shopping Cart**: Guest cart (localStorage) and authenticated cart (database) with auto-merge on login
- 💳 **Checkout**: Complete checkout flow with mock payment
- ⭐ **Reviews**: Leave product reviews with verified purchase indicators
- ❤️ **Wishlist**: Save favorite products for later
- 🔍 **Search**: Product search with autocomplete
- 🏷️ **Categories**: Browse products by category
- 📱 **Responsive Design**: Mobile-first, works on all devices

### Admin Features
- 📦 **Product Management**: Full CRUD operations for products
- 🗂️ **Category Management**: Manage product categories
- 📸 **Image Upload**: Upload product images to Supabase Storage
- 📊 **Inventory Management**: Track and update stock levels

### Technical Features
- ⚡ **Next.js 14+ App Router**: Server and client components
- 🎨 **TailwindCSS**: Modern, responsive UI
- 🗄️ **Supabase**: PostgreSQL database, authentication, and storage
- 🔒 **Row Level Security**: Secure data access with RLS policies
- 🚀 **Optimized Performance**: Server-side rendering and caching
- 📝 **TypeScript**: Full type safety

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- npm or yarn package manager

### 1. Clone and Install

```bash
cd ecommerce-app
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API to get your credentials
3. Copy `ENV_TEMPLATE.md` and create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Database

Run the following SQL files in your Supabase SQL Editor (in order):

1. **Schema**: `supabase/schema.sql` - Creates all tables and triggers
2. **RLS Policies**: `supabase/rls-policies.sql` - Sets up security policies
3. **RPC Functions**: `supabase/rpc-functions.sql` - Creates database functions
4. **Seed Data**: `supabase/seed-data.sql` - Adds sample categories and products

### 4. Set Up Storage

1. Go to Storage in your Supabase dashboard
2. Create a new bucket named `product-images`
3. Set it to **Public** or configure signed URLs
4. Update CORS settings if needed

### 5. Create Admin User

1. Register a new user through the app at `/auth/register`
2. In Supabase, go to Table Editor → profiles
3. Find your user and set `is_admin` to `true`

### 6. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ecommerce-app/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Auth pages (login, register)
│   ├── account/             # User account pages
│   ├── admin/               # Admin dashboard
│   ├── api/                 # API routes
│   ├── cart/                # Shopping cart page
│   ├── category/            # Category pages
│   ├── checkout/            # Checkout flow
│   ├── products/            # Product pages
│   ├── search/              # Search page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── cart/               # Cart components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── product/            # Product components
│   ├── review/             # Review components
│   └── ui/                 # Reusable UI components
├── lib/                     # Utilities and helpers
│   ├── supabase/           # Supabase clients
│   ├── constants.ts        # App constants
│   └── utils.ts            # Utility functions
├── store/                   # Zustand state management
│   ├── auth-store.ts       # Authentication state
│   └── cart-store.ts       # Shopping cart state
├── types/                   # TypeScript types
│   ├── database.types.ts   # Database types
│   └── index.ts            # Application types
├── supabase/               # Database files
│   ├── schema.sql          # Database schema
│   ├── rls-policies.sql    # Security policies
│   ├── rpc-functions.sql   # Database functions
│   └── seed-data.sql       # Sample data
└── middleware.ts           # Next.js middleware

```

## 🗄️ Database Schema

### Core Tables
- **profiles** - User profiles with admin flag
- **categories** - Product categories
- **products** - Product catalog
- **product_images** - Product images
- **reviews** - Product reviews
- **carts** - Shopping carts
- **cart_items** - Cart line items
- **orders** - Customer orders
- **order_items** - Order line items
- **wishlist** - User wishlists
- **coupons** - Discount coupons

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own cart, orders, reviews, and wishlist
- Only admins can create/update/delete products and categories
- Secure authentication with Supabase Auth
- Environment variables for sensitive data

## 🎨 Customization

### Styling
- Edit `app/globals.css` for global styles
- Modify TailwindCSS theme in `tailwind.config.ts`
- Update color scheme in CSS variables

### Features
- Add new product fields in `supabase/schema.sql`
- Create custom RPC functions in `supabase/rpc-functions.sql`
- Extend types in `types/index.ts`

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React

## 📦 Key Dependencies

```json
{
  "@supabase/supabase-js": "Latest Supabase client",
  "@supabase/ssr": "Server-side rendering support",
  "zustand": "State management",
  "react-hook-form": "Form handling",
  "zod": "Schema validation",
  "lucide-react": "Icon library"
}
```

## 🚧 Development Notes

### Guest Cart
- Stored in localStorage
- Automatically merges with user cart on login
- Persists across page refreshes

### Authenticated Cart
- Stored in Supabase database
- Syncs across devices
- Real-time updates

### Image Handling
- Product images stored in Supabase Storage
- Placeholder images used in seed data
- Replace with actual images in production

### Order Processing
- Uses RPC function `create_order_transaction` for atomic operations
- Automatically reduces inventory
- Clears cart after successful order

## 🔄 Workflow

1. **Browse Products**: View products by category or search
2. **Add to Cart**: Add items as guest or authenticated user
3. **Register/Login**: Create account or sign in
4. **Checkout**: Enter shipping details and complete order
5. **View Orders**: Check order history in account section
6. **Leave Reviews**: Rate and review purchased products

## 🎯 Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Email notifications
- Order tracking
- Advanced search filters
- Product variants (size, color)
- Coupon system implementation
- Analytics dashboard
- Multi-language support
- Dark mode toggle

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📧 Support

For issues or questions:
1. Check the Supabase documentation
2. Review the SQL files for database structure
3. Verify environment variables are set correctly

---

**Built with ❤️ using Next.js and Supabase**
