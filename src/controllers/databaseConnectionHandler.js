import { deployMode } from "../../config.js";
import { cartsDAO, chatDAO, usersDAO,
        productsDAO, ordersDAO } from '../DAOs/DAOs.js'

export async function initDatabaseConnection() {
    const statuscarts = await cartsDAO.init(deployMode)
    const statuschat = await chatDAO.init(deployMode)
    const statususers = await usersDAO.init(deployMode)
    const statusprodu = await productsDAO.init(deployMode)
    const statusorder = await ordersDAO.init(deployMode)
    return (statuscarts && statususers && statusprodu && statusorder)
}

export async function closeDatabaseConnection() {
    await cartsDAO.close()
    await chatDAO.close()
    await usersDAO.close()
    await productsDAO.close()
    await ordersDAO.close()
}