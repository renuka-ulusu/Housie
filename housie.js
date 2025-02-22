function generateTicket() {
    let ticket = new Set();
    while (ticket.size < 9) {
        ticket.add(Math.floor(Math.random() * 100) + 1);
    }
    return Array.from(ticket);
}

function renderBoard(size, boardId) {
    const board = document.getElementById(boardId);
    board.innerHTML = '';
    for (let i = 1; i <= size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerText = i;
        cell.setAttribute('data-number', i);
        board.appendChild(cell);
    }
}

function renderTickets(players) {
    const playersSection = document.getElementById('playersSection');
    playersSection.innerHTML = '<button id="pickButton" onclick="pickNumber()">Pick a Number</button>';
    
    players.forEach((ticket, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.innerHTML = `<h2>Player ${index + 1}</h2>`;
        const board = document.createElement('div');
        board.className = 'board';
        
        ticket.forEach(num => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerText = num;
            cell.setAttribute('data-number', num);
            board.appendChild(cell);
        });

        playerDiv.appendChild(board);
        playersSection.appendChild(playerDiv);
    });

    const winnerMessage = document.createElement('h2');
    winnerMessage.id = 'winnerMessage';
    playersSection.appendChild(winnerMessage);
}

function markNumber(number) {
    document.querySelectorAll(`.cell[data-number='${number}']`).forEach(cell => {
        cell.classList.add('marked');
    });
}

function checkWinner() {
    for (let i = 0; i < players.length; i++) {
        let playerTicket = players[i];
        let allMarked = playerTicket.every(num => pickedNumbers.has(num));

        if (allMarked) {
            document.getElementById('winnerMessage').innerText = `🎉 Congratulations! Player ${i + 1} Wins! 🎉`;
            document.getElementById('pickButton').disabled = true; 
            gameOver = true;
            return true;
        }
    }
    return false;
}

let players = [];
let pickedNumbers = new Set();
let gameOver = false;

function startGame() {
    gameOver = false;
    const numPlayers = document.getElementById('numPlayers').value;
    players = Array.from({ length: numPlayers }, generateTicket);
    renderTickets(players);
    renderBoard(100, 'numberBoard');
    document.getElementById('pickedNumber').innerText = ''; 
    pickedNumbers.clear();
}

function pickNumber() {
    if (gameOver || pickedNumbers.size === 100) return;

    let num;
    do {
        num = Math.floor(Math.random() * 100) + 1;
    } while (pickedNumbers.has(num));

    pickedNumbers.add(num);

    document.getElementById('pickedNumber').innerText = 'Picked Number: ' + num;
    markNumber(num);

    if (checkWinner()) {
        gameOver = true; 
    }
}
