export const apiFetch = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!data.success) {
            console.error(`Error fetching ${url}:`, data.error);
            throw new Error(data.error);
        }
        return data.data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        throw error;
    }
};