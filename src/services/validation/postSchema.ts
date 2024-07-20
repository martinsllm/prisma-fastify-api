const postSchemaValidation = {
    schema: {
        body: {
            type: 'object',
            properties: {
                title: { type: 'string', minLength: 3, maxLength: 50 },
                content: { type: 'string', minLength: 5, maxLength: 500 }
            }
        }
    }
};

export { postSchemaValidation };