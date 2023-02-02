import './Post.css';

const Post = (props) => {
    const setSelected = () => {
        props.setSelected(props.id);
    }

    return (
    <div className="Content" onClick={setSelected}>
        <h3> ID: {props.id}</h3>
        <h3> Title: {props.title}</h3>
        <h3> Content: {props.content}</h3>
        <h3> Author: {props.author}</h3>
    </div>
    );
}

export default Post;