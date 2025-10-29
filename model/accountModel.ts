export interface AccountModel {
  sellerName: string;
  accountTitle: string;
  accountDescription: string;
  price: number;
  rating: number;
  salesCount: number;
  imageUrls: string[];
  likes: number;
  createdAt: Date; // You can default this when creating
}
