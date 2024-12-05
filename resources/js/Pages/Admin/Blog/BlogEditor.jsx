import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BlogEditor = ({ onChange }) => {
    const [editorData, setEditorData] = useState("");

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
        if (onChange) onChange(data); // Pass data to parent component or handler
    };

    return (
        <div>
            <h2>CKEditor in React</h2>
            <CKEditor
                editor={ClassicEditor}
                data="<p>Hello, CKEditor!</p>"
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ data });
                }}
            />
            <p>Editor Data:</p>
            <div dangerouslySetInnerHTML={{ __html: editorData }} />
        </div>
    );
};

export default BlogEditor;
