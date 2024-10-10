import { IonCard, IonCardHeader, IonCardTitle, IonImg } from "@ionic/react"
import { Products } from "../../core/models";

interface ProductsProps {
    product: Products;
}

export const ProductsCardCarousel = ({ product }: ProductsProps) => {
    return (
        <IonCard>
            <IonImg src={`${product.images[0].replace('["', '').replace('"]', '')}`} alt={product.title} />
            <IonCardHeader>
                <IonCardTitle>{product.title}</IonCardTitle>
            </IonCardHeader>
        </IonCard>
    )
}