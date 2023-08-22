const socket = io()
const msgForm = document.querySelector('#msg-form');
const msgFormInput = msgForm.querySelector('#msg');
const msgFormBtn = msgForm.querySelector('button');
const msg = document.querySelector('#messages');
const msgTemplate = document.querySelector('#msg-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(msgTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm A')
    })
    msg.insertAdjacentHTML('beforeend', html)
})

socket.on('dataRoom', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('.sidebar').innerHTML = html
})

msgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msgFormBtn.setAttribute('disabled', 'disabled')
    const message = msgFormInput.value

    socket.emit('sendMessage', message, error => {
        msgFormBtn.removeAttribute('disabled')
        msgFormInput.value = ''
        msgFormInput.focus()

        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})
