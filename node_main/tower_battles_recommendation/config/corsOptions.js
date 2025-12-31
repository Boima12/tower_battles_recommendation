const allowedOrigins = [
    process.env.FRONTEND_URLS,
    process.env.FRONTEND_URLS_DEV
]
    .filter(Boolean)
    .flatMap(s => s.split(','))
    .map(s => s.trim())
    .filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        // allow requests that don't have an origin (mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

module.exports = corsOptions;
