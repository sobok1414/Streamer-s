import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';
import faker from 'faker';

class StreamList extends React.Component {

    state = { streams: {}, inital: true, hasMore: true }

    componentWillMount() {
        this.props.fetchStreams()
    }
    
    createButton() {
        if(this.props.isSignedIn){
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui positive button ">CREATE STREAM</Link>
                </div>
            )   
        }
    }

    renderAdmin(stream) {
        if(stream.userId === this.props.currentUserId) {
            return (
                <div className="ui two buttons">
                    <Link to={`/streams/edit/${stream.id}`} className="ui basic blue button">
                        EDIT
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui basic red button">
                        DELETE
                    </Link>
                </div>
            )
        }
    }

    renderStream() {
        const { streams } = this.props

        return streams.map(stream => {
            return (
                <div className="card" key={stream.id}>
                        <Link to={`/streams/${stream.id}`} className="image" >
                            <img alt="asdf" src={faker.image.avatar()} />
                        </Link> 
                        <div className="content">
                            <Link to={`/streams/${stream.id}`} className="header">
                                {stream.title}
                            </Link>
                            <div className="description">
                                {stream.description}
                            </div>
                        </div>
                        <div className="extra content">
                            {this.renderAdmin(stream)}
                        </div>
                    </div>
                )
        })
    }

    fetchStreams = () => {
        this.props.fetchStreams()
    }

    render() {
        return (
            <div>
                <div className="parents ui header">
                    <h2 className="ui left floated header">Streams</h2>
                    <div className="ui right floated header">{this.createButton()}</div>
                </div>
                <div className="ui clearing divider"></div>
                <div className="ui container" style={{ width: '1210px', overflow: 'hidden'}}>
                    <div className="ui link cards" style={{ padding: '5px' }}>
                        {this.renderStream()}
                    </div> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        streams: Object.values(state.streams), 
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList)