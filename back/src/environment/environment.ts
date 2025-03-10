export const environment = {
    // env
    production:             process.env.NODE_ENV === "production",

    // filesystem paths
    root:                   "/",
    frontendPath:           "/public",

    // uri relative
    frontendOrigin:         "http://localhost:4200", // dev
    swaggerUriPrefix:       "/swagger", // le suffixe pour accéder à l'interface de Swagger

    // security
    csp: `
        default-src 'self' {FE};
        script-src  'self' 'unsafe-inline' {FE};
        style-src   'self' 'unsafe-inline' {FE};
        img-src     'self' data: {FE};
        font-src    'self' {FE};
        connect-src 'self' {FE};
        frame-src   'self' {FE};
        object-src  'none' {FE};
        base-uri    'self' {FE};
        form-action 'self' {FE};
    `,

    // à injecter via fichier .env ou variables d'environnement
    accessTokenSecret:      "#{ACCESS_TOKEN_SECRET}",
    refreshTokenSecret:     "#{REFRESH_TOKEN_SECRET}",
    accessTokenExpiration:  "#{ACCESS_TOKEN_EXPIRATION}",
    refreshTokenExpiration: "#{REFRESH_TOKEN_EXPIRATION}",
    sessionDuration:        "#{SESSION_DURATION}",
    requestLogLevel:        "#{REQUEST_LOG_LEVEL}",
    appPort:                "#{APP_PORT}",
    rsaPublicKey:           "#{RSA_PUBLIC_KEY}",
    rsaPrivateKey:          "#{RSA_PRIVATE_KEY}",
};

