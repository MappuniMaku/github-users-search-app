import fetch from 'node-fetch';

export const fetchOptions = {
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
};

export async function apiGetUsersByName(payload = {}) {
    const queryParameters = [];

    Object.keys(payload).forEach(key => {
        queryParameters.push(`${key}=${payload[key]}`);
    });

    let url = 'https://api.github.com/search/users';

    if (queryParameters.length > 0) {
        url += `?${queryParameters.join('&')}`;
    }

    const response = await fetch(url, fetchOptions);

    return response.json();
}
