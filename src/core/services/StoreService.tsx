import axios from "axios"

export const getStoreCategories = async () => {
    try {
        const response = await axios(`${import.meta.env.VITE_SITE_API_URL}categories`);
        return response.data;
    } catch (error) {
        console.log('[getStoreCategories]: ', error);
    }
}