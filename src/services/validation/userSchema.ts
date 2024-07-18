const userSchemaValidation = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string', minLength: 3, maxLength: 50 },
                email: { type: 'string' },
                password: { type: 'string', minLength: 8, maxLength: 12 }
            }
        }
    }
};

export { userSchemaValidation };