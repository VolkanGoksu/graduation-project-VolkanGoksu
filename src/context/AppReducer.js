export default (state, action) => {
    switch (action.type) {
            case 'AUTH_ADMIN':
            return {
                ...state,
                isAdmin: action.payload
            }
        default:
            return state;
    }
}