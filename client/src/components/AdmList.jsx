import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { getUsers } from '../actions/authActions';
import { Container, Table } from 'reactstrap';

export class AdmList extends Component {
    static propTypes = {
        getUsers: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.getUsers();
    }

    rows = () => {
        const { users } = this.props.users;

        const listUsers = users
            .map((user) => (
                <tr key={user._id}>
                    <td>
                        {user.nome}
                    </td>
                    <td>
                        {user.apelido}
                    </td>
                    <td>
                        {user.matricula}
                    </td>

                </tr>
            ));

        return listUsers;

    }

    render() {
        return (
            <Container>
                <Table className="adms-table">
                    <thead>
                        <tr className="table-title-simple">
                            <th>Nome</th>
                            <th>Apelido</th>
                            <th>Matrícula</th>
                        </tr>
                    </thead>
                    <tbody>{this.rows()}</tbody>
                </Table>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users,
})

export default connect(mapStateToProps, { getUsers })(AdmList)
