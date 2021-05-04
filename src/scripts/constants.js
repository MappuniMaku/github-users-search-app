export const VUEX_MUTATIONS = {
    SET_SEARCH_RESULTS: 'setSearchResults',
    SET_SEARCH_QUERY: 'setSearchQuery',
    SET_REPOS_SORT_DIRECTION: 'setReposSortDirection',
    ADD_USERS: 'addUsers',
    SET_QUERY_IN_PROGRESS: 'setQueryInProgress',
};

export const VUEX_ACTIONS = {
    SEARCH_USERS_BY_NAME: 'searchUsersByName',
    GET_NEXT_USERS_PAGE: 'getNextUsersPage',
};

export const VUEX_GETTERS = {
    USERS_COUNT: 'usersCount',
    GET_USER_BY_ID: 'getUserById',
    REPOS_SORT_DIRECTION: 'reposSortDirection',
    IS_QUERY_MADE: 'isQueryMade',
    SEARCH_QUERY: 'searchQuery',
    LAST_REQUEST_TIME: 'lastRequestTime',
    IS_QUERY_IN_PROGRESS: 'isQueryInProgress',
};

export const ROUTES = {
    USER: 'user',
    SEARCH: 'search',
};

export const SORT_MODES = {
    REPOS: 'repositories',
};

export const SORT_DIRECTIONS = {
    ASC: 'asc',
    DESC: 'desc',
};

export const MESSAGES = {
    API_ERROR: 'Сервер не отвечает, повторите попытку позже',
};
