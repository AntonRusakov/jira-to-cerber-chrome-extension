(async function () {
    try {
        const value = await localforage.getItem('reduxPersist:env');
        if (value) {
            const token = extractToken(value);
            if (token) {
                return token;
            } else {
                throw new Error("Token not found in value");
            }
        } else {
            throw new Error("Value is null");
        }
    } catch (error) {
        console.error("Error fetching token:", error);
        return null;
    }
})();

function extractToken(edn) {
    const tokenMatch = edn.match(/\\"token\\",\\"([^\\"]+)\\"/);
    return tokenMatch ? tokenMatch[1] : null;
}
