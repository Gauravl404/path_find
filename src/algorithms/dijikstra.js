export function dijikstra(grid , startNode , finishNode) {
    const visitedNodeorder = [];
    startNode.distance = 0;
    const unvistedNodes = getallNode(grid);

    while(!!unvistedNodes.length) {
        sortNodes(unvistedNodes);
        const closest = unvistedNodes.shift();
        if(closest.isWall) {
            continue;
        }

        if(closest.distance === Infinity) return visitedNodeorder;

        closest.isvisited = true;

        visitedNodeorder.push(closest);
        if(closest === finishNode) {
            return visitedNodeorder;
        }
        updateunvistednode_neigbours(closest , grid);
    }
}

function updateunvistednode_neigbours(closest , grid) {
    const allneibours = get_unvisited_neigbours(closest , grid);
    // for(const node in allneibours) {
    //     console.log(closest.col+ '\n');
    //     node.previousNode = node;
    // }

    for(let i = 0 ; i < allneibours.length ; i++) {
      //console.log(allneibours[i].row + ' ' + allneibours[i].col + '\n');
      allneibours[i].distance = closest.distance + 1;
      allneibours[i].previousNode = closest;
    }
}



function get_unvisited_neigbours(node , grid) {
    const neigbours = [];

    const {row, col} = node;
    if(row > 0) {
        neigbours.push(grid[row-1][col]);
    }
    if(col > 0) {
        neigbours.push(grid[row][col-1]);
    }
    if(row < grid.length - 1) {
        neigbours.push(grid[row + 1][col]);
    }
    if(col < grid[0].length - 1) {
        neigbours.push(grid[row][col+1]);
    }

    return neigbours.filter(neigbours => !neigbours.isvisited);
}
function sortNodes(unvistedNodes) {
    unvistedNodes.sort((nodeA , nodeB) => nodeA.distance - nodeB.distance);
}

function getallNode(grid) {
    const nodes = [] ;
    for(const row of grid) {
        for(const node of row) {
            nodes.push(node);
        }
    }

    return nodes;
}

export function getNodeshortest(finishNode) {
    const nodeorder = [];
    let curr_node = finishNode;
    while(curr_node != null) {
        nodeorder.unshift(curr_node);
        curr_node = curr_node.previousNode;
    }

    return nodeorder;
}
