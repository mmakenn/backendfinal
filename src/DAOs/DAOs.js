import { CartsContainer } from "./datatype/cartsContainer.js";
import { ChatContainer } from "./datatype/chatContainer .js";
import { UsersContainer } from "./datatype/usersContainer.js";
import { OrdersContainer } from "./datatype/ordersContainer.js";
import { ProductsContainer } from "./datatype/productsContainer.js";

export const cartsDAO = new CartsContainer()
export const chatDAO = new ChatContainer()
export const usersDAO = new UsersContainer()
export const ordersDAO = new OrdersContainer()
export const productsDAO = new ProductsContainer()