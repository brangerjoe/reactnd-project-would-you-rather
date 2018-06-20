import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import '../styles/App.css';
import QuestionList from './QuestionList';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        App
        <QuestionList />
      </div>
    );
  }
}

export default connect()(App);
