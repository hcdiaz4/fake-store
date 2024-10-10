import { IonBadge, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonPage } from "@ionic/react"
import { Products } from "../../core/models";
import { heart, heartOutline } from "ionicons/icons";

interface ProductsProps {
    product: Products;
    toggleHandler?: any;
}

export const ProductsCard = ({ product, toggleHandler }: ProductsProps) => {
    return (
        <IonCard>
            <IonImg src={`${product.images[0].replace('["', '').replace('"]', '')}`} alt={product.title} />
            <IonCardHeader>
                <IonCardTitle>{product.title}</IonCardTitle>
                <IonCardSubtitle>
                    <IonBadge color="tertiary">${product.price}</IonBadge>
                </IonCardSubtitle>
            </IonCardHeader>
            <div className="wrap-icon">
                <IonIcon size="small" icon={product.isSaved ? heart : heartOutline} onClick={toggleHandler}></IonIcon>
            </div>
        </IonCard>
    )
}