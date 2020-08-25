import React, { Component } from 'react'
import Game from '../Game'
import Square from '../Square'
import winnerCalc from '../WinnerCalc'
import './style.scss'

type State = { matrix: Array<Array<string>>, turn: string, winner: string, restart: boolean }
type Props = { 
    /** number of rows in 2d array */
    rows: number, 
    /** number of columns in 2d array */
    cols: number, 
    /** number of matching value to win */
    numToWin: number 
}

class Board extends Component<Props, State> {
    state = {
        matrix: new Array(this.props.rows).fill(null).map(item => (new Array(this.props.cols).fill(null))),
        turn: 'X',
        winner: '',
        restart: false
    }

    createBoard = () => {
        let board = [];
        let matrix = this.state.matrix;
        for (let r = 0; r < this.props.rows; r++) {
            let row = [];
            for (let c = 0; c < this.props.cols; c++) {
                row.push(<Square row={r} col={c} key={r + c} setValue={this.handleSetValue} value={matrix[r][c]} disable={this.state.winner === 'X' || this.state.winner === 'O'} />);
            }
            board.push(<div className="row" key={"row" + r}>{row}</div>);
        }
        return <div className="rows-holder" style={{ width: this.props.cols * 58 }} >{board}</div>
    }

    handleSetValue = (lastRow: number, lastCol: number) => {
        let { matrix, turn } = this.state;
        matrix[lastRow][lastCol] = turn;
        const { rows, cols, numToWin } = this.props;
        const winner: string = winnerCalc(matrix, rows, cols, numToWin, lastRow, lastCol);
        console.log(`the winner is: ${winner}`);
        this.setState({ matrix: matrix, turn: turn === 'X' ? 'O' : 'X', winner: winner });
    }

    restartGame = () => {
        this.setState({ restart: true });
    }

    render() {
        console.log(this.state.matrix);
        const { turn, winner, restart } = this.state;
        if (restart)
            return <Game />
        let status: any = `Next player: ${turn}`;
        if (winner !== '') {
            if (winner === '-1') {
                status = `Draw!`;
            } else if (winner === 'X' || winner === 'O') {
                status = `The winner is ${winner}`;
            }
        }
        return (
            <div className="board">
                <div className="status">{status}</div>
                {this.createBoard()}
                <button className="restart" onClick={this.restartGame}>Restart</button>
            </div>
        )
    }
}

export default Board