import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        const id = this.props.match.params.id;

        this.props.editStream(id, formValues);
    }

    render(){
        if(!this.props.stream) {
            return <div>Loading...</div>
        }
        return(
            <div>
                <h3>Edit a Stream</h3>
                <div className="ui segment">
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit} 
                />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { match } = ownProps;
    return { stream: state.streams[match.params.id] }
}

export default connect(mapStateToProps,{ fetchStream, editStream })(StreamEdit);