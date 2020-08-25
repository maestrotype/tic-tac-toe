import React, { Component } from 'react'
import Board from '../Board'
import './style.scss'

type State = { rows: number, columns: number, minToWin: number, goodValues: boolean }
type Props = {}

class Game extends Component<Props, State> {
    state = {
        rows: 0,
        columns: 0,
        minToWin: 0,
        goodValues: false
    }

    StartGame() {
        return <><Board rows={this.state.rows} cols={this.state.columns} numToWin={this.state.minToWin} /><div style={{ clear: 'both' }}></div></>
    }

    ConfigGame() {
        return (
            <div className="config">
                <h3>Set rows and columns number to start playing</h3>
                <div className="input-value">
                    <span className='p-label'>
                        <label htmlFor='float-input-rows'>Rows</label>
                        <input
                            id='float-input-rows'
                            type='number'
                            min={0}
                            size={30}
                            value={this.state.rows}
                            onChange={e => this.SetValue('rows', e.target.value)}
                        />
                    </span>
                    <span className='p-label'>
                        <label htmlFor='float-input-columns'>Columns</label>
                        <input
                            id='float-input-columns'
                            type='number'
                            min={0}
                            size={30}
                            value={this.state.columns}
                            onChange={e => this.SetValue('columns', e.target.value)}
                        />
                    </span>
                    <span className='p-label'>
                        <label htmlFor='float-input-mintowin'>Min to win</label>
                        <input
                            id='float-input-mintowin'
                            type='number'
                            min={0}
                            size={30}
                            value={this.state.minToWin}
                            onChange={e => this.SetValue('minToWin', e.target.value)}
                        />
                    </span>
                    <button
                        className='p-button-raised'
                        onClick={this.PlayBtnClick}
                    >
                        Play
                    </button>
                    <div style={{ clear: 'both' }}></div>
                </div>
                <div style={{ clear: 'both' }}></div>
            </div>
        )
    }

    PlayBtnClick = () => {
        const { rows, columns, minToWin } = this.state;
        const max = rows > columns ? rows : columns;
        if (rows > 0 && columns > 0 && minToWin > 0 && minToWin <= max)
            this.setState({ goodValues: true });
    }

    SetValue = (key: string, value: string) => {
        this.setState({ [key]: value && parseInt(value[0]) !== 0 ? parseInt(value) : '' } as any);
    }

    render() {
        if (!this.state.goodValues) {
            return this.ConfigGame();
        } else {
            return this.StartGame();
        }
    }
}

export default Game