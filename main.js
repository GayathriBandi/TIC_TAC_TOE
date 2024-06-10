document.addEventListener('DOMContentLoaded', () => {
    let turn = 'X';
    const boxes = document.querySelectorAll('.box');
    const result = document.getElementById('results');
    const playAgainButton = document.getElementById('play-again');
    const turnIndicators = document.querySelectorAll('.turn-box');

    const updateTurnIndicator = () => {
        turnIndicators.forEach(indicator => {
            indicator.classList.remove('X-turn', 'O-turn');
            if (indicator.textContent === turn) {
                indicator.classList.add(`${turn}-turn`);
            }
        });
    };

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boxes[a].textContent === turn && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
                pattern.forEach(index => {
                    boxes[index].classList.add('winning-block');
                });
                return true;
            }
        }
        return false;
    };

    const handleBoxClick = (e) => {
        const box = e.target;
        if (box.textContent === 'X' || box.textContent === 'O') return;

        box.textContent = turn;
        box.classList.add(turn);

        if (checkWinner()) {
            result.textContent = `${turn} wins!`;
            boxes.forEach(box => box.removeEventListener('click', handleBoxClick));
            playAgainButton.style.display = 'block';
        } else {
            turn = turn === 'X' ? 'O' : 'X';
            updateTurnIndicator();
        }
    };

    boxes.forEach(box => box.addEventListener('click', handleBoxClick));

    playAgainButton.addEventListener('click', () => {
        boxes.forEach(box => {
            box.textContent = '';
            box.classList.remove('X', 'O', 'winning-block');
        });
        result.textContent = '';
        turn = 'X';
        updateTurnIndicator();
        boxes.forEach(box => box.addEventListener('click', handleBoxClick));
        playAgainButton.style.display = 'none';
    });

    updateTurnIndicator();
});
