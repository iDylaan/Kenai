export async function getPGLData() {
    try {
        const response = await fetch('/postgres/status', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) throw new Error("Error en la petición");

        const result = await response.json();

        if (result.success) return result.data;
        else throw new Error(result.error.message);
    } catch (error) {
        throw new Error(error.message);
    }
}