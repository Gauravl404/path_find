import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Node from '../NODE/Node'
import '../NODE/Node.css'

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
        row , col
    };
}


const fun = () => {

}

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
    
    render() {
        const {grid, mouseIsPressed} = this.state;
        
        return(
            <>
            <button type ="button" onClick= {() => this.initializeComponent()}> grid</button>
            <div className = "grid">
                {grid.map((row , rowidx) => {
                    return (
                        <div key = {rowidx}>
                            {row.map((node ,nodeidx) => {
                                const   {row, col } = node;
                                return <Node>
                                    row = {row}
                                    col = {col}
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

