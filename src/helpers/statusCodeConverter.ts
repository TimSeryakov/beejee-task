export const statusCodeAsBoolean = (statusCode: 0 | 10) => statusCode === 10
export const booleanAsStatusCode = (boolean: boolean) => boolean ? 10 : 0
