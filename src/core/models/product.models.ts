import { Category } from "./category.models";

export interface Products {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: Date;
    updatedAt: Date;
    category: Category;
    isSaved?: boolean;
}