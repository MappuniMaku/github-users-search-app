export const mapUser = (data) => ({
    id: data.id,
    name: data.login,
    avatarUrl: data.avatar_url,
    profileUrl: data.html_url,
    reposUrl: data.repos_url,
});

export const mapGetUsersByNameResponse = (data) => ({
    totalCount: data.total_count,
    items: data.items.map(mapUser),
});
