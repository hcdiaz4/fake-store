import axios from "axios"

export const getProductsByCategory = async (category_id: number) => {
    try {
        const response = await axios(`${import.meta.env.VITE_SITE_API_URL}products?categoryId=${category_id}`);
        return response.data;
    } catch (error) {
        console.log('[getProductsByCategory]: ', error);
    }
}