import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

const ChatPage = () => {
    const { id } = useParams()

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [chatUser, setChatUser] = useState(null);

    const bottomRef = useRef();
    const myEmail = localStorage.getItem("email");


    const [selectedProduct, setSelectedProduct] = useState(null)
    const [myProducts, setMyProducts] = useState([])
    const [showProducts, setShowProducts] = useState(false)

    // load messages
    const loadMessages = async () => {
        const res = await api.get(`/api/chats/${id}/messages`)
        setMessages(res.data)
    }

    // load chat user
    useEffect(() => {
        api.get("/api/chats/my")
            .then(res => {
                const chat = res.data.find(c => c.id == id)
                setChatUser(chat)
            })
    }, [id])

    // polling (FAST)
    useEffect(() => {
        loadMessages()
        const interval = setInterval(loadMessages, 2000)
        return () => clearInterval(interval)
    }, [id])

    // mark seen
    useEffect(() => {
        if (messages.length > 0) {
            api.put(`/api/chats/${id}/seen`)
        }
    }, [id])

    // auto scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        })
    }, [messages])


    // send message
    const send = async () => {
        if (!input.trim()) return

        // instant UI (no delay feel)
        setMessages(prev => [
            ...prev,
            {
                id: Date.now(),
                content: input,
                sender: {
                    email: myEmail
                },
                delivered: true,
                seen: false
            }
        ])

        await api.post(`/api/chats/${id}/send`, {
            content: input,
            productId: selectedProduct?.id || null
        })

        setInput("")
        loadMessages()
        setSelectedProduct(null)
    }

    // delete message
    const deleteMessage = async (mid) => {
        await api.delete(`/api/chats/message/${mid}`)
        loadMessages()
    }

    // loadProducts 
    const loadMyProducts = async () => {
        const res = await api.get("/api/products/my")
        setMyProducts(res.data)
    }


    const formatDateLabel = (dateStr) => {
        if (!dateStr) return ""

        const msgDate = new Date(dateStr)
        const today = new Date()
        const yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)

        if (msgDate.toDateString() === today.toDateString()) return "Today"
        if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday"

        return msgDate.toLocaleDateString([], {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        // <div>ChatPage</div>
        <div className='flex flex-col h-[85vh] max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden'>
            <div className="bg-blue-500 text-white px-4 py-3 flex items-center gap-3">
                <div className='w-10 h-10 rounded-full bg-white text-blue-500 flex items-center justify-center font-bold'>
                    {chatUser?.otherUserName?.charAt(0)}
                </div>
                <div className='flex-1'>
                    <div className="font-semibold">
                        {chatUser?.otherUserName}
                    </div>
                    <div className="text-xs opacity-80">
                        {chatUser?.otherUserEmail}
                    </div>
                </div>
                <button
                    onClick={async () => {
                        await api.delete(`/api/chats/${id}`)
                        window.location.href = "/"
                    }}
                    className="text-xs bg-red-500 px-2 py-1 rounded"
                >
                    Delete
                </button>
            </div>

            {/* messages */}
            <div className='flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100'>
                {/* {messages.map(m => {

                    const isMe = m.sender?.email === myEmail

                    return (
                        <div
                            key={m.id}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow relative
                        ${isMe
                                        ? "bg-blue-500 text-white"
                                        : "bg-white border"
                                    }`}
                            >
                                <div>{m.content}</div>

                                {m.productId && (
                                    <div
                                        onClick={() => window.location.href = `/product/${m.productId}`}
                                        className="mt-2 text-xs bg-gray-200 px-2 py-1 rounded cursor-pointer"
                                    >
                                        📦 View Product
                                    </div>
                                )}

                                <div className="text-[10px] mt-1 opacity-70 text-right">
                                    {m.sentAt ? new Date(m.sentAt).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : ""}
                                </div>

                                {isMe && (
                                    <>
                                        <div className="text-[10px] mt-1 text-right">
                                            <span className={m.seen ? "text-blue-200" : ""}>
                                                {m.seen ? "✔✔" : m.delivered ? "✔✔" : "✔"}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => deleteMessage(m.id)}
                                            className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1'
                                        >
                                            ×
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )
                })} */}


                {messages.map((m, index) => {
                    const isMe = m.sender?.email &&
                        myEmail &&
                        m.sender.email.trim().toLowerCase() === myEmail.trim().toLowerCase()

                    console.log(isMe)
                    console.log(m.sender?.email)
                    console.log(myEmail)

                    const currentDate = formatDateLabel(m.sentAt)
                    const prevDate = index > 0
                        ? formatDateLabel(messages[index - 1].sentAt)
                        : null

                    const showDate = currentDate !== prevDate

                    return (
                        <React.Fragment key={m.id}>
                            {/* // date header */}
                            {showDate && (
                                <div className='flex justify-center my-3'>
                                    <div className='bg-gray-300 text-xs px-3 py-1 rounded-full text-gray-700'>
                                        {currentDate}
                                    </div>
                                </div>
                            )}


                            {/* message */}
                            <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow relative 
                                    ${isMe
                                            ? "bg-blue-500 text-white rounded-br-none ml-auto"
                                            : "bg-gray-300 text-black rounded-bl-none mr-auto"
                                        }`}
                                >
                                    <div>{m.content}</div>

                                    {m.productId && (
                                        <div
                                            onClick={() => window.location.href = `/product/${m.productId}`}
                                            className='mt-2 border rounded p-2 bg-white cursor-pointer hover:bg-gray-50'
                                        >
                                            <div className='text-xs text-gray-500'>📦 Product</div>
                                            <div className='text-sm font-medium text-blue-600'>
                                                View Product
                                            </div>
                                        </div>
                                    )}

                                    <div className='text-[10px] mt-1 opacity-70 text-right'>
                                        {m.sentAt && new Date(m.sentAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>


                                    {isMe && (
                                        <>
                                            <div className='text-[10px] text-right'>
                                                <span className={m.seen ? "text-blue-200" : ""}>
                                                    {m.seen ? "✔✔" : m.delivered ? "✔✔" : "✔"}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => deleteMessage(m.id)}
                                                className='absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full'
                                            >
                                                ×
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })}
                <div ref={bottomRef}></div>
            </div>


            {selectedProduct && (
                <div className='p-2 border-t bg-gray-50 flex items-center gap-2'>
                    <img src={selectedProduct.thumbnailUrl} className='w-10 h-10 rounded' />
                    <span className='text-sm flex-1'>{selectedProduct.title}</span>

                    <button
                        onClick={() => setSelectedProduct(null)}
                        className='text-red-500 text-xs'
                    >
                        ✖
                    </button>
                </div>
            )}

            {/* input */}
            <div className='flex border-t bg-white'>
                <button
                    onClick={async () => {
                        await loadMyProducts()
                        setShowProducts(true)
                    }}
                    className="px-3 text-lg"
                >
                    📦
                </button>
                {showProducts && (
                    <div className='fixed inset-0 bg-black/40 flex justify-center items-center'>
                        <div className='bg-white p-4 rounded w-80 max-h-96 overflow-y-auto'>
                            <h2 className='font-semibold mb-3'>Select Product</h2>

                            {myProducts.map(p => (
                                <div
                                    key={p.id}
                                    onClick={() => {
                                        setSelectedProduct(p)
                                        setShowProducts(false)
                                    }}
                                    className='flex items-center gap-2 p-2 border mb-2 cursor-pointer hover:bg-gray-100'
                                >
                                    <img src={p.thumbnailUrl} className='w-10 h-10 object-cover rounded' />
                                    <div>
                                        <div className='text-sm'>{p.title}</div>
                                        <div className='text-xs text-gray-500'>₹{p.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}



                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className='p-3 flex-1 outline-none'
                    placeholder='Type a message...'
                />
                <button
                    onClick={send}
                    className='bg-blue-500 text-white px-6 hover:bg-blue-600'
                >
                    Send
                </button>


            </div>
        </div >
    )
}

export default ChatPage