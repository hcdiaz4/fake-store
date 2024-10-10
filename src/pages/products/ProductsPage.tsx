import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Products } from "../../core/models";
import { getProductsByCategory } from "../../core/services/ProductService";
import './ProductPage.css';
import { ProductsCard } from "../../components/products/ProductsCard";

interface UserDetailPageProps
    extends RouteComponentProps<{
        id: string;
    }> { }


const ProductsPage: React.FC<UserDetailPageProps> = ({ match }) => {

    const [productsList, setProductsList] = useState<Products[]>([]);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        const getStorageProductList = localStorage.getItem('@desiredProducts');
        const jsonStorageProducts: Products[] = JSON.parse(getStorageProductList!);


        const products = await getProductsByCategory(Number(match.params.id));
        const productsCopy: Products[] = [];
        products.map((item: Products) => {
            if (getStorageProductList) {
                const productStorage = jsonStorageProducts.filter((x) => x.id === item.id);
                productsCopy.push({ ...item, isSaved: productStorage[0]?.isSaved });
            } else {
                productsCopy.push({ ...item, isSaved: false });
            }
        })

        setProductsList(productsCopy);
    }

    const toggleFavorite = (key: number) => {
        console.log(key);

        // Copy state products
        const copyProducts = [
            ...productsList
        ];

        copyProducts[key].isSaved = !productsList[key].isSaved;

        let desiredProducts = localStorage.getItem('@desiredProducts');

        if (!desiredProducts) {

            localStorage.setItem('@desiredProducts', JSON.stringify([copyProducts[key]]));

        } else {

            let getDesiredProducts: Products[] = JSON.parse(desiredProducts);
            const existProductInLocal = getDesiredProducts.filter((x) => x.id === productsList[key].id);
            const indexExistProduct = getDesiredProducts.findIndex((x) => x.id === productsList[key].id);

            if (existProductInLocal.length) {
                getDesiredProducts.splice(indexExistProduct, 1);
                localStorage.setItem('@desiredProducts', JSON.stringify(getDesiredProducts));
            } else {
                getDesiredProducts.push(copyProducts[key]);
                localStorage.setItem('@desiredProducts', JSON.stringify(getDesiredProducts));
            }

        }


        setProductsList(copyProducts);
    }

    const productsRender = productsList.length ? (
        <>
            <h3>{productsList[0]?.category.name} products</h3>
            <div className="grid">
                {productsList.map((product, key) => {
                    return (
                        <ProductsCard key={product.id} product={product} toggleHandler={() => toggleFavorite(key)} />
                    )
                })}
            </div></>
    ) : (
        <div>There are no products for this category.</div>
    );

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton text={''}></IonBackButton>
                    </IonButtons>
                    <IonTitle>Products List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                {productsRender}
            </IonContent>
        </IonPage>
    )
}

export default ProductsPage;