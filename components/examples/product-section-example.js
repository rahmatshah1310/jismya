"use client"

import { ProductSection } from '../home/product-section'

export function ProductSectionExample() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        ProductSection Component Examples
      </h2>
      
      {/* Example 1: Using categoryId (Recommended) */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Example 1: Using categoryId</h3>
        <p className="text-sm text-gray-600 mb-4">
          This approach fetches both category details and products from the API
        </p>
        <ProductSection 
          title="Electronics" 
          categoryId="electronics" 
          maxProducts={4} 
          showViewAll={true} 
        />
      </div>

      {/* Example 2: Using category (Legacy) */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Example 2: Using category (Legacy)</h3>
        <p className="text-sm text-gray-600 mb-4">
          This approach still works but uses the legacy category prop
        </p>
        <ProductSection 
          title="Fashion" 
          category="fashion" 
          maxProducts={3} 
          showViewAll={false} 
        />
      </div>

      {/* Example 3: Custom configuration */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Example 3: Custom Configuration</h3>
        <p className="text-sm text-gray-600 mb-4">
          Shows more products and custom loading state
        </p>
        <ProductSection 
          title="Home & Living" 
          categoryId="home-living" 
          maxProducts={8} 
          showViewAll={true} 
          isLoading={false} 
        />
      </div>

      {/* Example 4: Minimal configuration */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Example 4: Minimal Configuration</h3>
        <p className="text-sm text-gray-600 mb-4">
          Uses only required props with default values
        </p>
        <ProductSection 
          title="Sports & Fitness" 
          categoryId="sports-fitness" 
        />
      </div>
    </div>
  )
}
