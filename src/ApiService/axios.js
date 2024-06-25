const apiUrl = "http://localhost:8000";

async function get(endpoint) {
    const url = `${apiUrl}/${endpoint}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'appel GET à l'API:", error.message);
        throw error;
    }
}

async function post(endpoint, data, headers = { "Content-Type": "application/json" }) {
    const url = `${apiUrl}/${endpoint}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error("Erreur lors de l'appel POST à l'API:", error.message);
        throw error;
    }
}

async function put(endpoint, data, headers = { "Content-Type": "application/json" }) {
    const url = `${apiUrl}/${endpoint}`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'appel PUT à l'API:", error.message);
        throw error;
    }
}


async function del(endpoint, headers = { "Content-Type": "application/json" }) {
    const url = `${apiUrl}/${endpoint}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: headers
        });

        if (response.status === 204) {
            return { status: 204, message: 'No Content' };
        }

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'appel DELETE à l'API:", error.message);
        throw error;
    }
}

export { get, post, put, del };
