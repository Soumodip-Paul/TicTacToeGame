// console.log("Welcome to our Tic Tac Toe Game")
let turn = 'X';
let connection = null;
let peer = new Peer();
let remoteData = null
let myTurn = 'X';
const button = document.getElementById('start');
const text = document.getElementById('turn');

peer.on('open', id => {
    // console.log('My peer ID is:' + id);

    button.innerHTML = 'Start'
    text.innerText = `Your id: ${id}`
    text.onclick = () => navigator.clipboard.writeText(id)
    button.onclick = () => ConnectToPeer(prompt("Enter your friend's id"))

});

function ConnectToPeer(peerId) {
    // console.log(peerId);
    connection = peer.connect(peerId);

    peer.on('error', function (err) {
        // console.log('error');
    });

};

peer.on('connection', function (conn) {
    // console.log(conn.peer);
    if (!connection) ConnectToPeer(conn.peer)
    // console.log('peer connected');
    conn.on('open', function () {
        // console.log('conn open');
        SendMessage({ turn: myTurn })
        button.innerText = 'Stop'
        button.onclick = null
        text.onclick = null
        text.innerText = turn === myTurn ? `Your Turn (${myTurn})` : `Turn for ${turn}`
        main()
    });
    conn.on('data', function (data) {
        // console.log(data);
        if (data.turn !== undefined && data.turn !== null) {
            button.innerText = 'Stop'
            button.onclick = null
            text.onclick = null
            myTurn = data.turn === 'X' ? 'O' : 'X';
            text.innerText = turn === myTurn ? `Your Turn (${myTurn})` : `Turn for ${turn}`
            main()
        }
        else if (data.index !== undefined && data.index !== null) {
            remoteData = data.index
            document.getElementsByClassName('grid')[remoteData].click()
            remoteData = null
        }
    });
});


function SendMessage(message) {
    connection.send(message);
};