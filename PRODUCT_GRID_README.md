# Product Grid Page - Professional E-commerce Grid

A professional, responsive product grid page built with Next.js + React that showcases products with advanced filtering, sorting, and pagination capabilities.

## 🚀 Features

### Core Functionality
- **Category-based Product Display**: Shows all products for a given category via route `/category/[category]`
- **Responsive Grid Layout**: 4 columns on desktop, 2 on tablet, 1 on mobile
- **Advanced Filtering**: Size-based filtering with reset functionality
- **Smart Sorting**: Price (low→high, high→low), newest, oldest
- **Pagination**: Load more functionality for better performance
- **URL State Management**: Filters and sorting persist in URL for sharing/bookmarking

### Product Cards
- **Professional Design**: Clean, modern card layout with hover effects
- **Image Navigation**: Click image/name to go to product detail page
- **Add to Cart**: Integrated with existing CartContext
- **Discount Display**: Shows discount badges when applicable
- **Rating Display**: Star ratings when available
- **Responsive Actions**: Different button layouts for mobile/desktop

### User Experience
- **Loading States**: Skeleton loading for better perceived performance
- **Error Handling**: Graceful error states with retry options
- **Mobile Optimized**: Touch-friendly interface with mobile-specific controls
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized image loading with Next.js Image component

## 📁 File Structure

```
app/
├── category/
│   ├── page.js                    # Categories index page
│   └── [category]/
│       └── page.js               # Individual category page
components/
├── products/
│   ├── product-grid.js           # Main grid component
│   └── product-card.js           # Individual product card
└── skeletons/
    └── product-skeleton.js       # Loading skeleton (reused)
```

## 🛠️ Usage

### Basic Implementation

```jsx
// In your page component
import { ProductGrid } from "../../../components/products/product-grid";

export default function CategoryPage() {
  const { category } = useParams();
  return <ProductGrid categoryName={category} />;
}
```

### Route Structure

- **All Categories**: `/category` - Shows all available categories
- **Category Products**: `/category/[categoryId]` - Shows products for specific category
- **Example**: `/category/electronics` - Shows all electronics products

### API Integration

The component automatically uses your existing React Query hooks:

- `useProductsByCategory(categoryName)` - Fetches products by category
- `useProductsBySize(size)` - Fetches products filtered by size
- `useGetSizes()` - Fetches available sizes for filtering

## 🎨 Customization

### Styling
- Uses Tailwind CSS with custom utility classes
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Custom color scheme via CSS variables
- Hover effects and transitions for interactive elements

### Grid Layout
```css
/* Responsive grid */
grid-cols-1          /* Mobile: 1 column */
sm:grid-cols-2       /* Tablet: 2 columns */
lg:grid-cols-3       /* Desktop: 3 columns */
xl:grid-cols-4       /* Large: 4 columns */
```

### Product Cards
- **Hover Effects**: Scale transform, shadow changes, border color
- **Action Buttons**: Add to cart, wishlist, quick view
- **Image Optimization**: Next.js Image with responsive sizing
- **Loading States**: Skeleton placeholders during API calls

## 🔧 Configuration

### Environment Variables
No additional environment variables required - uses existing API configuration.

### Dependencies
- Next.js 13+ with App Router
- React Query (TanStack Query)
- Tailwind CSS
- React Icons (Heroicons)

### Performance Features
- **Image Optimization**: Automatic WebP conversion and responsive sizing
- **Lazy Loading**: Images load as they enter viewport
- **Pagination**: Load more instead of infinite scroll for better performance
- **Debounced Updates**: URL updates are debounced to prevent excessive API calls

## 📱 Mobile Experience

### Responsive Design
- **Mobile First**: Designed for mobile devices first
- **Touch Friendly**: Large touch targets and intuitive gestures
- **Collapsible Filters**: Filters collapse on mobile for better UX
- **Quick Actions**: Mobile-specific add to cart buttons

### Mobile Navigation
- **Hamburger Menu**: Collapsible navigation with categories
- **Touch Gestures**: Swipe and tap optimized interactions
- **Viewport Optimization**: Proper viewport meta tags and scaling

## 🎯 Advanced Features

### Filter Persistence
- **URL State**: All filters are stored in URL parameters
- **Shareable Links**: Users can share filtered results
- **Browser Back**: Proper back/forward navigation support
- **Deep Linking**: Direct links to filtered results

### Sorting Options
- **Price Sorting**: Low to high, high to low
- **Date Sorting**: Newest first, oldest first
- **Smart Defaults**: Newest products shown by default
- **Performance**: Client-side sorting for instant results

### Error Handling
- **Graceful Degradation**: Shows helpful error messages
- **Retry Mechanisms**: Easy retry options for failed requests
- **Fallback Content**: Meaningful content when products unavailable
- **User Guidance**: Clear instructions for resolving issues

## 🚀 Getting Started

1. **Install Dependencies**: Ensure all required packages are installed
2. **API Setup**: Verify your product and category APIs are working
3. **Route Setup**: Add the category routes to your Next.js app
4. **Navigation**: Update header navigation to include category links
5. **Testing**: Test with different categories and filter combinations

## 🔍 Troubleshooting

### Common Issues
- **Products Not Loading**: Check API endpoints and network requests
- **Filters Not Working**: Verify size data is available from API
- **Mobile Layout Issues**: Check Tailwind CSS responsive classes
- **Performance Issues**: Monitor API response times and image loading

### Debug Tips
- Use browser dev tools to check network requests
- Verify React Query cache is working properly
- Check console for any JavaScript errors
- Test with different screen sizes and devices

## 📈 Future Enhancements

### Planned Features
- **Advanced Filters**: Price range, brand, rating filters
- **Search Integration**: Product search within categories
- **Wishlist Integration**: Save products for later
- **Comparison Tools**: Compare multiple products
- **Analytics**: Track user interactions and preferences

### Performance Optimizations
- **Virtual Scrolling**: For very large product lists
- **Image Preloading**: Preload next page images
- **Service Worker**: Offline support and caching
- **CDN Integration**: Faster image delivery

## 🤝 Contributing

When contributing to this component:

1. **Follow Patterns**: Maintain existing code structure and naming conventions
2. **Test Responsively**: Ensure all changes work across device sizes
3. **Performance**: Monitor bundle size and loading performance
4. **Accessibility**: Maintain WCAG compliance standards
5. **Documentation**: Update this README for any new features

## 📄 License

This component is part of the user.pk e-commerce platform and follows the same licensing terms.
