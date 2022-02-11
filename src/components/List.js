import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class List extends Component {

    static propTypes = { contacts: PropTypes.array.isRequired }

    state = { filterText: "" }

    render() {

        const close = document.getElementById("close")

        const clear = () => {
            this.setState({ filterText: "" })
            close.style.display = "none"
        }

        const onChangeFilter = (e) => {

            this.setState({ filterText: e.target.value })

            if (e.target.value) {
                close.style.display = "block"
            } else {
                close.style.display = "none"
            }
        }

        const filterContacts = this.props.contacts.filter(
            item => {
                return item.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1
                    || item.phone.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1
            }
        )

        return (
            <>
                <div className="filter">
                    <button onClick={clear} id="close" type="button" className="btn-close" aria-label="Close"></button>
                    <input className="form-control" name="filter" id="filter" placeholder="Filter..."
                        onChange={onChangeFilter} value={this.state.filterText} />
                </div>

                <div className="scrool">
                    <table className="table table-hover mb-2">
                        <tbody>

                            {filterContacts.map((item, index) => {
                                return <tr key={index}>
                                    <td><i className="bi bi-person"> </i>{item.name}</td>
                                    <td style={{ textAlign: "end" }}><i className="bi bi-telephone"> </i>
                                        {item.phone.substr(0, 3) + "-" + item.phone.substr(3, 3) + "-" + item.phone.substr(6)}
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>
            </>);
    }
}