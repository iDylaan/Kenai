export async function sendPrompt(promptData) {
    try {
        const response = await fetch('/kenai/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(promptData)
        })

        if (!response.ok) throw new Error(response.statusText);

        const result = await response.json();

        if (result.success) return result.data;
        else throw new Error(result.error.message);
    } catch (error) {
        throw new Error(error.message);
    }
}