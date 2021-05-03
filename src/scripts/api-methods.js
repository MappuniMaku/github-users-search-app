export async function apiGetUsersByName(payload = {}) {
    const queryParameters = [];

    Object.keys(payload).forEach(key => {
        queryParameters.push(`${key}=${payload[key]}`);
    });

    let url = 'https://api.github.com/search/users';

    if (queryParameters.length > 0) {
        url += `?${queryParameters.join('&')}`;
    }

    const response = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
        },
    });

    return response.json();
}
