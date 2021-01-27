import React, { Component } from 'react'
import apiCall from '../api'

class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            boxes: []
        }
    }

    componentDidMount() {
        apiCall("get", "/boxes", {})
            .then(boxes => this.setState({
                boxes,
                isLoading: false
            }))
    }

    render() {
        //todo: moment format date
        let boxes = this.state.isLoading ? <p>loading...</p> : this.state.boxes.map(box => <tr><td>{box.startDate}</td><td>{box.boxType}</td></tr>)
        return (
            <div>
                <h1>Boxes</h1>
                <table>
                    <tr>
                        <th>Start Date</th>
                        <th>Box Type</th>
                    </tr>
                    {boxes}
                </table>


            </div>
        )
    }
}

export default componentName
