import { usersDAO } from "../DAOs/DAOs.js"
import { sendEmailTo } from "../misc/mailSender.js"
import { adminEmail } from "../../config.js"
import { User } from "../models/user.js"
import path from 'path'
import { fileFrom } from "node-fetch"
import Handlebars from "handlebars"

export async function sendNotificationNewOrder(order) {
    const userData = await usersDAO.getById(order.getCustomerId())
    const user = new User(userData)
    const userEmail = user.getEmail()

    const contentHTMLAdmin = await createcontentHTMLAdmin(order, user)
    const contentHTMLUser = await createcontentHTMLUser(order)

    sendEmailTo(adminEmail, "Nuevo pedido recibido", contentHTMLAdmin)
    sendEmailTo(userEmail, "Has realizado un pedido", contentHTMLUser)
}

async function createcontentHTMLAdmin(order, user) {
    const template = await fileFrom(path.resolve() + '/src/templates/adminEmailNewOrder.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const context = {
        orderId: order.getId(),
        products: order.getProductsList(),
        userEmail: user.getEmail(),
        userName: user.getName(),
        userLastname: user.getLastname(),
        userPhone: user.getPhone()
    }
    return functionTemplate(context)
}

async function createcontentHTMLUser(order) {
    const template = await fileFrom(path.resolve() + '/src/templates/userEmailNewOrder.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const context = {
        orderId: order.getId(),
        products: order.getProductsList()
    }
    return functionTemplate(context)
}