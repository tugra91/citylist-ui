const defaultHeader = {
    "Access-Control-Allow-Origin": "http://127.0.0.1:8082",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    "Content-Type": "application/json;charset=UTF-8"
}

export const getData = async (path) => {
    const requestOptions = {
        method: "GET",
        headers: defaultHeader,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    };
    const response = await fetch(path, requestOptions);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

export const getDataWithHeader = async (path, header) => {

    const requestOptions = {
        method: "GET",
        headers: { ...defaultHeader, ...header },
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    };
    const response = await fetch(path, requestOptions);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

export const postData = async (path, body) => {
    const requestOptions = {
        method: "POST",
        headers: defaultHeader,
        body: JSON.stringify(body),
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    }
    const response = await fetch(path, requestOptions);

    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

export const postDataWithHeader = async (path, header, body) => {
    const requestOptions = {
        method: "POST",
        headers: { ...defaultHeader, ...header },
        body: JSON.stringify(body),
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    }
    const response = await fetch(path, requestOptions)
        .then((response) => {
            if (response.status === 401) {
                throw throwErrorMessage("Unauthorization process please login before your current request.");
            }
            return response;
        });

    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

export const postFormDataWithHeader = async (path, header, formData) => {
    const requestOptions = {
        method: "POST",
        headers: { ...defaultHeader, ...header },
        body: formData,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    }
    const response = await fetch(path, requestOptions);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

const throwErrorMessage = (messageInput) => {
    return { code: "", message: messageInput, type: "" };
}
