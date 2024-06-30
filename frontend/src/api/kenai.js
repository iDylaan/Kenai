export async function sendPrompt(prompt) {
    try {
        const response = await fetch('/kenai/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt
            })
        })

        if (!response.ok) throw new Error(response.statusText);

        const result = await response.json();

        if (result.success) return result.data;
        else throw new Error(result.error.message);
    } catch (error) {
        throw new Error(error.message);
    }
}