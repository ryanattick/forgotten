import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Request from '../../../../helpers/requests';
import Dropzone from 'react-dropzone'


class PhotoUpload extends React.Component {
  constructor() {
    super()
    this.state = {
      files: []
    }
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }


  onDrop(files) {
    this.setState({
      files
    }, () => {
      console.log(this.state.files[0].preview)
    });
  }

  handleSubmitClick () {
    Request.post('/updateAvatar', {
      avatar: this.state.files[0].preview,
      id: this.props.id
    }, () => {
      // this.props.backToMainFromAvatar(this.state.avatarChoice.img);
    });
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
        {this.state.files.length > 0 &&
          <div>
            <img src={this.state.files[0].preview} style={{maxHeight: '100px', maxWidth: '100px'}}/>
          <RaisedButton label="Default" onClick={this.handleSubmitClick}/>
          </div>
        }
      </section>
    );
  }
}

export default PhotoUpload;
