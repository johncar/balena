import React, { Component } from 'react';
import './App.css';
import Header from './../Header';
import Toolbar from './../Toolbar';
import Lightning from './../Lightning';
import { Alert } from 'rendition';

const API = 'http://localhost:3000/api/v1/';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lightning: undefined,
            error: null
        };
    }

    componentDidMount() {
        this.setState({});

        fetch(API + 'device')
          .then(response => response.json())
          .then(result => this.setState({ lightning: result.data }))
          .catch(error => this.setState({ error }));;
    }

    render() {
        const { lightning, error } = this.state;

        if (error) {
            return (
                <div className="root-application">
                    <Header/>
                    <Toolbar/>
                    <Alert danger>{error.message}</Alert>
                </div>
            );
        }

        return (
            <div className="root-application">
                <Header/>
                <Toolbar/>
                <Lightning data={lightning}/>
            </div>
        );
    }
}

export default App;
