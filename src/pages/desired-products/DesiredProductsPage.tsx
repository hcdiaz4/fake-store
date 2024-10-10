import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import { ProductsCard } from "../../components";
import { Products } from '../../core/models';
import './DesiredproductsPage.css';

const DesiredProductsPage: React.FC = () => {

    const [desiredList, setDesiredList] = useState<Products[]>([]);
    const [order, setOrder] = useState<string>('');

    useEffect(() => {
        console.log('Load useEffect');
    }, [order]);

    useIonViewWillEnter(() => {
        fetchDesiredProducts();
    });

    const fetchDesiredProducts = async () => {
        const getStorageProductList = localStorage.getItem('@desiredProducts');
        const jsonStorageProducts: Products[] = JSON.parse(getStorageProductList!);
        if (getStorageProductList) {
            setDesiredList(jsonStorageProducts);
        }
    }

    const orderByPrice = (event: any, type?: string) => {


        console.log(event.target.value);
        let copyDesiredList: Products[] = desiredList;
        copyDesiredList = desiredList.sort((a: Products, b: Products) => {
            if (a.price > b.price) {
                return -1;
            } else {
                return 1;
            }
        });

        if (type == 'price') {
            switch (event.target.value) {
                case 'asc':
                    copyDesiredList = desiredList.sort((a: Products, b: Products) => {
                        if (a.price < b.price) {
                            return -1;
                        } else {
                            return 1;
                        }
                    })
                    break;
                case 'des':
                    copyDesiredList = desiredList.sort((a: Products, b: Products) => {
                        if (a.price > b.price) {
                            return -1;
                        } else {
                            return 1;
                        }
                    })
                    break;
            }

        } else if (type == 'name') {
            switch (event.target.value) {
                case 'asc':
                    copyDesiredList = desiredList.sort((a: Products, b: Products) => {
                        if (a.title < b.title) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                    break;
                case 'des':
                    copyDesiredList = desiredList.sort((a: Products, b: Products) => {
                        if (a.title > b.title) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                    break;
            }
        }

        setDesiredList(copyDesiredList);
        setOrder(event.target.value);


    }

    const desiredProductsRender = desiredList.length ? (
        <div className="grid">
            {desiredList.map(product => {
                return (
                    <ProductsCard product={product} key={product.id} />
                )
            })}
        </div>
    ) : (
        <div>
            You have no products in your wish list.
        </div>
    )

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton text={''}></IonBackButton>
                    </IonButtons>
                    <IonTitle>Desired Products List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonItem>
                <span>Order By:</span>
                <IonSelect placeholder="Name" onIonChange={(event) => orderByPrice(event, 'name')}>
                    <IonSelectOption value="asc">A-Z</IonSelectOption>
                    <IonSelectOption value="des">Z-A</IonSelectOption>
                </IonSelect>

                <IonSelect placeholder="Price" onIonChange={(event) => orderByPrice(event, 'price')}>
                    <IonSelectOption value="asc">Lower price</IonSelectOption>
                    <IonSelectOption value="des">Higher price</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonContent fullscreen className="ion-padding">
                <section>
                    <h3>Tu productos deseados</h3>
                    {desiredProductsRender}

                </section>
            </IonContent>
        </IonPage>
    )
}

export default DesiredProductsPage;