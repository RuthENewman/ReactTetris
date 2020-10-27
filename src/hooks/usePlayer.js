import { useState, useCallback } from 'react';
import { STAGE_WIDTH } from '../gameHelpers';

import { generateRandomTetromino } from '../tetrominos';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        position: {x: 0, y: 0},
        tetromino: generateRandomTetromino().shape,
        collided: false
    });

    const updatePlayerPosition = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            position: { 
                x: (prev.position.x += x),
                y: (prev.position.y += y)
            },
            collided
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            position: { 
                x: (STAGE_WIDTH / 2) - 2, 
                y: 0
            },
            tetromino: generateRandomTetromino().shape,
            collided: false
        })
    }, [])

    return [player, updatePlayerPosition, resetPlayer];
}