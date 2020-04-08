import React, {Component} from 'react';
import Node from '../NODE/Node'
import { dijikstra , getNodeshortest} from '../algorithms/dijikstra';
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
        isStart : row === st_r && col === st_c,
        isFinish : row === des_r && col === des_c,
        distance: Infinity,
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


    animatemain(visitedNodeOrder , nodeINshortestPath) {
        for(let i = 0 ; i <= visitedNodeOrder.length ; i++) {

            if(i === visitedNodeOrder.length) {
                setTimeout(() => {
                    this.animateshort(nodeINshortestPath);
                }, 10 * i);
                continue;
            }
            setTimeout(() => {
                const node = visitedNodeOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            } , 10 * i);
        }
    }

    animateshort(nodeINshortestPath) {
        for(let i = 0; i < nodeINshortestPath.length ; i++) {
            //console.log("Dasdadadsa");
            setTimeout(() => {
                const node = nodeINshortestPath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            } , 50 * i);
        }
    }
    dijikstraAlgorithm() {
        const {grid}= this.state;
        const startNode = grid[st_r][st_c];
        const finishNode = grid[des_r][des_c];
        const visitedNodeOrder = dijikstra(grid, startNode , finishNode);
        const nodeINshortestPath = getNodeshortest(finishNode);
        this.animatemain(visitedNodeOrder , nodeINshortestPath);
    }

    render() {
        const {grid, mouseIsPressed} = this.state;
        
        return(
            <>
            <button type ="button" onClick= {() => this.initializeComponent()}> grid</button>
            <button type = "button" onClick = {() => this.dijikstraAlgorithm()}> dijikstra</button>
            <div className = 'grid'>
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

