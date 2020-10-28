import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';
import { usePlayer } from './usePlayer';

export const useStage = (player, resetTetromino) => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        const updateStage = prevStage => {
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.position.y][x + player.position.x] = [
                            value, 
                            `${player.collided ? 'merged' : 'clear'}`,
                        ]
                    }
                })
            })
            return newStage;
        }
        setStage(prev => updateStage(prev));
    }, [player.collided, player.position.x, player.position.y, player.tetromino])

    return [stage, setStage];
}