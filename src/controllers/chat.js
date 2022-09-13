import { chatDAO } from "../DAOs/DAOs.js";
import { ChatMessage } from "../models/chatMessage.js";

export function emitChat(socket, sockets) {
    chatDAO.getAll()
        .then(messagesData => {
            const messages = []
            messagesData.forEach(data => {
                try {
                    const message = new ChatMessage(data)
                    messages.push(message.getData())
                } catch(error) {
                    socket.emit('invalidDataAtForm', error.message)
                }
            })
            socket.emit('showChat', messages)
        })

    socket.on('updateChat', data => {
        const message = new ChatMessage(data)
        chatDAO.save(message.getData())
            .then(() => {
                chatDAO.getAll()
                    .then(messagesData => {
                        const messages = []
                        messagesData.forEach(data => {
                            try {
                                const message = new ChatMessage(data)
                                messages.push(message.getData())
                            } catch(error) {
                                socket.emit('invalidDataAtForm', error.message)
                            }
                        })
                        socket.emit('showChat', messages)
                    })
            })
    });
}