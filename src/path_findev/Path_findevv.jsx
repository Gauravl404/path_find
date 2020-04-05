import React, {Component} from 'react';
import Node from '../NODE/Node'

import './path_findevv.css';

const st_r = 10;
const st_c = 10;
const des_r = 10;
const des_c = 40;


const make_grid = () => {
    const grid = [];

    for(let row = 0 ; row < 20 ; row++) {
        const inrow = [];
        for(let col = 0 ; col < 50 ; col++) {
            inrow.push(createNode(row, col));
        }
        grid.push(inrow);
    }
    return grid;
}

const createNode = (row , col) => {
    return {
        row : row, col : col,
        is_st : row === st_r && col === st_c,
        is_en : row === des_r && col === des_c,
        dist: Infinity,
        isvisited : false,
        isWall : false,
        previousNode : null,

    };
}

const getNewgridWall = (grid , row, col) => {
    const newG = grid.slice();
    newG[row][col].isWall = !newG[row][col].isWall;
    return newG;
};


export default class path_findevv extends Component {
    constructor() {
      super();
      this.state = {
        grid: [],
        mouseIsPressed: false,
      };
    }

    initializeComponent() {
        const grid = make_grid();
        this.setState({grid});
    }
    

    handleMouseDown(row, col) {
        const newgrid = getNewgridWall(this.state.grid , row, col);
        this.setState({grid : newgrid , mouseIsPressed : true});
    }
    handleMouseEnter(row, col) {
        if(!this.state.mouseIsPressed) {
            return;
        }
        const newgrid = getNewgridWall(this.state.grid , row, col);
        this.setState({grid: newgrid});
    }

    handleMouseUp() {
        this.setState({mouseIsPressed : false});
    }

    render() {
        const {grid, mouseIsPressed} = this.state;
        
        return(
            <>
            <button type ="button" onClick= {() => this.initializeComponent()}> grid</button>
            <div className = "grid">
                {grid.map((row , rowidx) => {
                    return (
                        <div key = {rowidx}>
                            {row.map((node ,nodeIdx) => {
                                const {row, col, isFinish, isStart, isWall} = node;
                                return <Node
                                    key={nodeIdx}
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    isWall={isWall}
                                    mouseIsPressed={mouseIsPressed}
                                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                    onMouseEnter={(row, col) =>
                                        this.handleMouseEnter(row, col)
                                    }
                                    onMouseUp={() => this.handleMouseUp()}
                                    row={row}>
                                </Node>
                            })}
                        </div>
                    );
                })}
            </div>
            </>
        );
    }
};

