/* ---------------------------------------------------------------------------------------------- */
/*                                 Handling Failures Operations                                   */
/* ---------------------------------------------------------------------------------------------- */
export function createJSONCreationError(objectName, errorMessage) {
    return { status: 409, 
            message: `Error occurs. ${objectName} NOT saved.`,
            description: errorMessage }
}

export function createJSONReadError(objectName, id) {
    return { status: 404, 
            message: `NOT Found ${objectName} with id '${id}'` }
}

export function createJSONUpdateError(objectName, id) {
    return { status: 400, 
            message: `Error ocurrs. ${objectName} with id '${id}' NOT updated.` }
}

export function createJSONDeleteError(objectName, id) {
    return { status: 400, 
            message: `Error ocurrs. ${objectName} with id '${id}' NOT deleted.` }
}

export function createJSONDatabaseReadError(objectName, id, errorMessage) {
    return { status: 409, 
            message: `Data stored for ${objectName} with id '${id}' is invalid.`,
            description: errorMessage }
}

export const registerError = { status: 409, message: "User not saved" }
export const loginError = { status: 401, message: "Invalid user and/or password." }
export const adminPermissionError = { status: 403, message: "Unauthorized: User is NOT admin." }
export const userPermissionError = { status: 401, message: "Unauthorized: User is NOT authenticated." }

/* ---------------------------------------------------------------------------------------------- */
/*                                Handling Succesfull Operations                                  */
/* ---------------------------------------------------------------------------------------------- */
export function createJSONUploadOK(destinationFolder, filename) {
    const file = `${destinationFolder}/${filename}`
    return { status: 200, message: `Image saved at ${file}`, serverDestinationPath: file }
}

export function createJSONCreationOK(objectName, id) {
    return { status: 201, 
            message: `New ${objectName} created with id '${id}'`,
            id: id }
}

export function createJSONReadOK(objectName, id, content) {
    return { status: 200, 
            message: `Found ${objectName} with id '${id}'`,
            content: content }
}

export function createJSONUpdateOK(objectName, id) {
    return { status: 200, 
            message: `Updated ${objectName} with id '${id}'` }
}

export function createJSONDeleteOK(objectName, id) {
    return { status: 200, 
            message: `Deleted ${objectName} with id '${id}'` }
}

export const loginOK = { status: 200, message: "User authenticated." }

/* ---------------------------------------------------------------------------------------------- */
/*                               Handling not implemented endpoints                               */
/* ---------------------------------------------------------------------------------------------- */
export function createJSONNotImplemented(url, method) {
   return { status: 501, message: `Request to URL: ${url} with method: ${method} is not implemented` }
}
