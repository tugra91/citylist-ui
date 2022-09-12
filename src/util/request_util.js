export const checkStringIsEmtpty = (str) => {
    if (typeof str === 'string' && str !== '') {
        return false;
    }
    return true;
}