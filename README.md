# User.pk E-commerce Platform

Pakistan's leading e-commerce platform for health & beauty, electronics, fashion, and more.

## ProductSection Component Usage

The `ProductSection` component has been updated to use both category and product APIs:

### Features:
- **Category API Integration**: Fetches category details (name, description) for the section heading
- **Product API Integration**: Fetches products related to the specified category
- **Dynamic Headings**: Section titles are now dynamically loaded from the category API
- **Fallback Support**: Falls back to the provided title if the API fails

### Usage Examples:

#### Using categoryId (Recommended):
```jsx
<ProductSection 
  title="For His Beard" 
  categoryId="for-his-beard" 
  maxProducts={6} 
  showViewAll={true} 
/>
```

#### Using category (Legacy support):
```jsx
<ProductSection 
  title="Women Perfumes" 
  category="women-perfumes" 
  maxProducts={4} 
  showViewAll={false} 
/>
```

#### With custom configuration:
```jsx
<ProductSection 
  title="Electronics" 
  categoryId="electronics" 
  maxProducts={8} 
  showViewAll={true} 
  isLoading={false} 
/>
```

### API Integration:

The component now makes two API calls:
1. **Category API**: `GET /categories/:id` - Fetches category details for the heading
2. **Product API**: `GET /categories/:id` - Fetches products in that category

### Props:

- `title` (string): Fallback title if category API fails
- `categoryId` (string): Category ID for API calls (recommended)
- `category` (string): Category identifier (legacy support)
- `maxProducts` (number): Maximum number of products to display (default: 6)
- `showViewAll` (boolean): Whether to show "View All" button (default: true)
- `isLoading` (boolean): Force loading state (default: false)

### Notes:

- The component automatically handles loading states for both APIs
- Error handling gracefully falls back to the provided title
- Navigation and pagination elements use unique IDs based on the category
- The "View All" link dynamically uses the category ID for routing

## Development

This project is built with:
- Next.js 14
- React 18
- Tailwind CSS
- React Query (TanStack Query)
- Swiper for product carousels
