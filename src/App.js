import React, {Component} from "react";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="board">
                    {this.renderRows()}
                </div>
                <div className="controls">
                    <button className="btn-left" onClick={() => this.props.moveLeft()}>Left</button>
                    <button className="btn-down" onClick={() => this.props.moveDown()}>Down</button>
                    <button className="btn-right" onClick={() => this.props.moveRight()}>Right</button>
                </div>
            </div>
        );
    }

    renderRows() {
        const rows = [];
        for (let i = 0; i < this.props.rows; i++) {
            rows.push(<div key={i} className="row">{this.renderCells(i)}</div>);
        }
        return rows;
    }

    renderCells(rowNumber) {
        const columns = [];
        for (let i = 0; i < this.props.columns; i++) {
            columns.push(<div key={i} className={`cell ${this.filled(rowNumber, i) ? 'cell--filled' : ''}`}/>);
        }
        return columns;
    }

    filled(rowNumber, cellNumber) {
        return this.props.filledRows.indexOf(rowNumber) !== -1 && this.props.filledCells.indexOf(cellNumber) !== -1
    }
}

App.propTypes = {
    columns: React.PropTypes.number.isRequired,
    rows: React.PropTypes.number.isRequired,
    filledRows: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    filledCells: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    moveDown: React.PropTypes.func.isRequired,
    moveLeft: React.PropTypes.func.isRequired,
    moveRight: React.PropTypes.func.isRequired
};

export default App;