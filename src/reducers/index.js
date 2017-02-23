import * as _ from "lodash";

export default (state = {}, action) => {

    const moveDown = cell => {
        return {row: cell.row + 1, column: cell.column};
    };
    const moveLeft = cell => {
        return {row: cell.row, column: cell.column - 1};
    };
    const moveRight = cell => {
        return {row: cell.row, column: cell.column + 1};
    };

    function blockHitsBottom(state) {
        return _.find(state.filledCells.map(moveDown), cell => cell.row > state.board.height - 1);
    }

    function blockHitsLeftBorder(state) {
        return _.find(state.filledCells.map(moveLeft), cell => cell.column < 0);
    }

    function blockHitsRightBorder(state) {
        return _.find(state.filledCells.map(moveRight), cell => cell.column > state.board.width - 1);
    }

    function blockHitsSettledCell(state, nextPosition) {
        return _.intersectionWith(
                state.settledCells,
                state.filledCells.map(nextPosition),
                _.isEqual
            ).length > 0
    }

    function blockHitsSettledCellUnderneath(state) {
        return blockHitsSettledCell(state, moveDown)
    }

    function blockHitsSettledCellOnTheLeft(state) {

        return blockHitsSettledCell(state, moveLeft)
    }

    function blockHitsSettledCellOnTheRight(state) {
        return blockHitsSettledCell(state, moveRight);
    }

    switch (action.type) {
        case 'MOVE_DOWN':
            if (blockHitsBottom(state) || blockHitsSettledCellUnderneath(state)) {
                return Object.assign({}, state, {
                    filledCells: [],
                    settledCells: _.concat(state.settledCells, state.filledCells)
                });
            }
            return Object.assign({}, state, {
                filledCells: state.filledCells.map((cell) => {
                    return {row: cell.row + 1, column: cell.column};
                })
            });
        case 'MOVE_RIGHT':
            if (blockHitsRightBorder(state) || blockHitsSettledCellOnTheRight(state)) {
                return state;
            }
            return Object.assign({}, state, {
                filledCells: state.filledCells.map((cell) => {
                    return {row: cell.row, column: cell.column + 1};
                })
            });
        case 'MOVE_LEFT':
            if (blockHitsLeftBorder(state) || blockHitsSettledCellOnTheLeft(state)) {
                return state;
            }
            return Object.assign({}, state, {
                filledCells: state.filledCells.map((cell) => {
                    return {row: cell.row, column: cell.column - 1};
                })
            });

        case 'NEXT_BLOCK':
            return Object.assign({}, state, {
                filledCells: [
                    {row: 0, column: 4},
                    {row: 0, column: 5},
                    {row: 1, column: 4},
                    {row: 1, column: 5}
                ]
            });
        default:
            return state;
    }
}
