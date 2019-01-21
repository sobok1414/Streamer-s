import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions'
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.props.deleteStream(id)} 
                    className="ui button negative"
                >
                    DELETE
                </button>
                <Link to="/" className="ui button">CANCEL</Link>
            </React.Fragment>
        )
    }
    renderContent() {
        if(!this.props.stream) {
            return '정말 삭제하시겠습니까??'
        }

        return (
            <div>
                <p>정말 삭제하시겠습니까??</p>
                Title : <strong>{this.props.stream.title}</strong>
            </div>
        )
    }

    render() {
        return(
                <Modal 
                    title="DELETE STREAM"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);