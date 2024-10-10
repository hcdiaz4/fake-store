import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import { getStoreCategories } from "../../core/services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Category, Products } from "../../core/models";
import { CategoryCard, ProductsCardCarousel } from "../../components";
import './MainPage.css';
import { heart } from "ionicons/icons";

const MainPage: React.FC = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [desiredProducts, setDesiredProducts] = useState<Products[]>([]);

    useEffect(() => {
        fetchCategories();
        getDesiredProducstStorage();
    }, []);

    useIonViewWillEnter(() => {
        getDesiredProducstStorage();
    });

    const fetchCategories = async () => {
        const categories = await getStoreCategories();
        setCategories(categories);
    }

    const getDesiredProducstStorage = () => {
        const storageDesiredProducts = localStorage.getItem('@desiredProducts');
        const listProducts: Products[] = JSON.parse(storageDesiredProducts!);
        setDesiredProducts(listProducts);
    }

    const desiredProductsHTML = desiredProducts ? desiredProducts.map(products => {
        return (
            <SwiperSlide key={products.id} className="">
                <ProductsCardCarousel product={products} />
            </SwiperSlide>
        )
    }) : (
        <div>No has guardado nada</div>
    )

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Fake Store {import.meta.env.VITE_SITE_NAME}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <section className="categories">
                    <h3>Categories</h3>
                    <Swiper
                        spaceBetween={15}
                        slidesPerView={2.3}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {categories.map(category => {
                            return (
                                <SwiperSlide key={category.id} className="">
                                    <CategoryCard category={category} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </section>

                <section className="desired-products">
                    <div className="desired-products__title">
                        <div>
                            <IonIcon size="large" icon={heart}></IonIcon>
                            <h3>Your Desired Products</h3>
                        </div>
                        <IonButton routerLink={'/desired-products'} size="small">See all</IonButton>
                    </div>
                    <Swiper
                        spaceBetween={15}
                        slidesPerView={2.3}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {desiredProductsHTML}
                    </Swiper>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default MainPage;