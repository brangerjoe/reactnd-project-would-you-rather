import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../actions/shared';
import QuestionList from './QuestionList';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import Login from './Login';
import UserPane from './UserPane';
import '../styles/kube.css';

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <div className='container'>
                        <Nav />
                        {this.props.loading
                            ? 'Loading'
                            : this.props.authedUser !== 'none' ?
                                <div>
                                    <UserPane />
                                    <Route path='/' exact component={QuestionList} />
                                    <Route path='/question/:id' component={QuestionPage} />
                                    <Route path='/new' component={NewQuestion} />
                                    <Route path='/leaderboard' component={Leaderboard} />
                                </div> :
                                <div>
                                    <Login />
                                </div>}
                    </div>
                </Fragment>
            </Router>
        );
    }
}

const mapStateToProps = ({ authedUser }) => {
    return {
        loading: authedUser === null,
        authedUser
    };
}

export default connect(mapStateToProps)(App);
