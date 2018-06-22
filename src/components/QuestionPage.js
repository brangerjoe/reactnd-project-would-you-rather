import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Would you rather...</h1>
                <Question id={this.props.match.params.id} size='full' />
            </div>
        );
    }
}

export default connect()(QuestionPage);