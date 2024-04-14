// src/common/response.util.ts

/**
 * Handles successful responses for the API.
 */
export function handleResponse(data: any, status: number) {
    return {
        success: true,
        data: data,
        status: status
    };
}

/**
 * Handles error responses for the API.
 */
export function handleErrorResponse(error: string, status: number) {
    return {
        success: false,
        error: error,
        status: status
    };
}
