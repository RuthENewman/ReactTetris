import React, { useState } from 'react';
import { createStage } from '../gameHelpers';

// Styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPosition, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log('re-render');

    const movePlayer = (direction) => {
        updatePlayerPosition({ x: direction, y: 0 });
    }

    const startGame = () => {
        // Reset everything
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPosition({ x: 0, y: 1, collided: false });
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            }
        }
    }

    return (
        <StyledTetrisWrapper 
         role="button"
         tabIndex="0"
         onKeyDown={event => move(event)}
         >
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                    <div>
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />
                    </div>)}
                    <StartButton onClick={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;