import { useState } from 'react';

import { generateRandomTetromino } from '../tetrominos';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        position: {x: 0, y: 0},
        tetromino: generateRandomTetromino().shape,
        collided: false
    });

    return [player];
}