import axios from "axios";
import { useRef} from "react";
import './NewPost.css';

const NewPost = (props) => {

    const newPostForm = useRef();

    const PostHandler = () =>{
        const form = newPostForm.current;
        const data = {
            title: form['title'].value,
            author: form['author'].value,
            content: form['content'].value
        };
        axios.post('http://localhost:8080/posts', data)
            .then(data => {
                props.setFlagState(props.flag + 1);
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }
    return (
        <div className="NewPost">
            <form ref={newPostForm}>
                <h2>Add a Post</h2>
                <label>Title</label>
                <input type="text"  label={'title'}  name={'title'}/>
                <label>Author</label>
                <input type="text" label={'author'} name={'author'} />
                <label>Content</label>
                <textarea type="text" label={'content'} name={'content'} />
            </form>
            <button onClick={PostHandler}>Add Post </button>
        </div>
    );

}

export default NewPost;