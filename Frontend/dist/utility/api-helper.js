"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = 'http://localhost:5000';
function handleResponse(response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (response.ok) {
            return response.json();
        }
        try {
            const errorData = yield response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        catch (e) {
            throw new Error('Unexpected response from server');
        }
    });
}
export function postData(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        return handleResponse(response);
    });
}
export function getData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${BASE_URL}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        return handleResponse(response);
    });
}
export function putData(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${BASE_URL}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        return handleResponse(response);
    });
}
export function patchData(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${BASE_URL}${url}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        return handleResponse(response);
    });
}
export function deleteData(url, data) {
    return fetch(`${BASE_URL}${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    }).then(handleResponse);
}

export function logout() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        const data = yield response.json();
        if (response.ok) {
            return data.message;
        }
        else {
            throw new Error(data.message || 'Logout failed');
        }
    });
}
