import fetch from 'node-fetch';

export const fetchOptions = {
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
};

export function apiGetUsersByName(payload = {}) {
    let url = new URL('https://api.github.com/search/users');

    if (Object.keys(payload).length > 0) {
        const searchParams = new URLSearchParams(payload);

        url.search = searchParams.toString();
    }

    return fetch(url, fetchOptions).then(response => response.json());
}
