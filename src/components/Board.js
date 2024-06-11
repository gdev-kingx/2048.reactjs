import React, { useState } from 'react'
import Tile from './Tile'
import Cell from './Cell'
import { Board } from "../helper";
import useEvent from '../hooks/useEvent';
import GameOverlay from './GameOverlay'
  
const BoardView = () => {
    const [board, setBoard] = useState(new Board());

    const handleKeyDown = (e) => {
        if (board.hasWon()) return;

        if (e.keyCode >= 37 && e.keyCode <= 40) {
            let direction = e.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBoard = boardClone.move(direction);
            setBoard(newBoard);
        }
    }

    useEvent('keydown', handleKeyDown)

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                {row.map((col, colIndex) => {
                    return <Cell key={rowIndex * board.size + colIndex} />
                })}
            </div>
        )
    })

    const tiles = board.tiles.filter((tile) => tile.value !== 0).map((tile, i) => {
        return <Tile tile={tile} key={i}/>
    })

    const resetGame = () => {
        setBoard(new Board())
    }

    return (
        <div>
            <h1 className='text'>2048</h1>
            <div className='details-box'>
                <div className='resetButton' onClick={resetGame}>New Game</div>
                <div className='score-box'>
                    <div className='score-header'>SCORE</div>
                    <div>{board.score}</div>
                </div>
            </div>
            <div className='board'>
                {cells}{tiles}
                <GameOverlay onRestart={resetGame} board={board}/>
            </div>
        </div>
    )
}

export default BoardView;