import React from 'react';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


class BlogEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    }
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'link', 'image'
  ]

  render() {
    return (
      <div className="text-editor">
        <ReactQuill theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    className=' h-60'>
        </ReactQuill>
      </div>
    );
  }
}

export default BlogEditor;
