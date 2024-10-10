import { IonCard, IonCardHeader, IonCardTitle, IonImg, IonPage } from "@ionic/react"
import { Category } from '../../core/models/category.models';

interface CategoryProps {
    category: Category;
}

export const CategoryCard = ({ category }: CategoryProps) => {
    return (
        <IonCard routerLink={`/products-category/${category.id}`}>
            <IonImg src={`${category.image}&w=340&h=180&r=4278`} alt={category.name} />
            <IonCardHeader>
                <IonCardTitle>{category.name}</IonCardTitle>
            </IonCardHeader>
        </IonCard>
    )
}