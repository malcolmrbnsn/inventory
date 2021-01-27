import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import apiCall from '../api';

class Sellers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      sellers: []
    }
  }

  componentDidMount() {
    apiCall("get", "/sellers", {})
      .then(sellers => {
        console.log(sellers);
        this.setState({
          isLoading: false,
          sellers
        })
      })
  }

  render() {
    let sellers = this.state.isLoading ? <p>loading...</p> : this.state.sellers.map(seller => <tr><td>{seller.name}</td><td>{seller.email}</td><td></td></tr>)
    return (
      <div>
        <h1>Sellers</h1>
        <Link to="/sellers/new">Add Seller</Link>
        <table>
          <tr>
            <th>
              Seller Name
              </th>
            <th>
              Email
              </th>
            <th>
              Boxes Sold
              </th>
            <th>
              Boxes out
              </th>
          </tr>
          {sellers}
        </table>

      </div>
    )
  }
}

export default Sellers