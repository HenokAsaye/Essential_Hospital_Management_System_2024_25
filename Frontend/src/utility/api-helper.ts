"use strict";

const BASE_URL = 'http://localhost:5000';

async function handleResponse(response: Response): Promise<any> {
    if (response.ok) {
        return response.json();
    }

    try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    } catch (e) {
        throw new Error('Unexpected response from server');
    }
}

export async function postData(url: string, data: any): Promise<any> {
    const response = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });
    return handleResponse(response);
}

export async function getData(url: string): Promise<any> {
    const response = await fetch(`${BASE_URL}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return handleResponse(response);
}

export async function putData(url: string, data: any): Promise<any> {
    const response = await fetch(`${BASE_URL}${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });
    return handleResponse(response);
}

export async function patchData(url: string, data: any): Promise<any> {
    const response = await fetch(`${BASE_URL}${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });
    return handleResponse(response);
}

export async function deleteData(url: string): Promise<any> {
    const response = await fetch(`${BASE_URL}${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return handleResponse(response);
}

export async function logout(): Promise<string> {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
        return data.message;
    } else {
        throw new Error(data.message || 'Logout failed');
    }
}
