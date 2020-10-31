import { useState, useCallback } from 'react';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';

import { TETROMINOS, generateRandomTetromino } from '../tetrominos';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        position: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const rotate = (matrix, direction) => {
        const rotatedTetromino = matrix.map((val, index) => matrix.map(col => col[index]));
        if (direction > 0) { 
            return rotatedTetromino.map(row => row.reverse()); 
        }
        return rotatedTetromino.reverse();
    }

    const playerRotate = (stage, direction) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);
        const position = clonedPlayer.position.x;
        let offset = 1;
        while(checkCollision(clonedPlayer, stage, {
            x: 0, y: 0
        })) {
            clonedPlayer.postiion.x += offset;
            offset = (offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -direction);
                clonedPlayer.position.x = position;
                return;
            }
        }
        
        setPlayer(clonedPlayer);
    }

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

    return [player, updatePlayerPosition, resetPlayer, playerRotate];
}