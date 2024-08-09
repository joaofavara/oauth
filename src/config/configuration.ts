export default () => ({
    jwtSecret: process.env.JWT_SECRET,
    googleAuth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET,
        callbackUrls: process.env.GOOGLE_CALLBACK_URL
    }
});