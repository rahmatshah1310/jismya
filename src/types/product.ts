export type Product = {
  title: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  id: number;
  // The UI components reference backend-shaped fields; make them optional to satisfy usage.
  _id?: string;
  productName?: string;
  imageUrl?: string;
  discount?: number;
  saleName?: string;
  reviewsCount?: number;
  ratingCount?: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
