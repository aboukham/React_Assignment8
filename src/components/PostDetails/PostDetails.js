import './PostDetails.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Comment from "../Comment/Comment";


const PostDetails = (props) => {

    const [selectedPost, setSelectedPost] = useState(null);
     const [postComments, setPostComments] = useState([]);
    useEffect(
        () => {
            if (props.selectedId) {
                axios.get("http://localhost:8080/posts/" + props.selectedId)
                    .then((response) => {
                        setSelectedPost(response.data);
                        axios.get("http://localhost:8080/posts/v1/" + props.selectedId +"/comments").then(rs => {
                            setPostComments(rs.data);
                        }).catch(error => {
                            console.log(error.message);
                        })


                    }).catch(error => {
                    console.log(error.message);
                })
            }
        }, [props.selectedId]
    )

    const deleteHandler = () => {
        if (props.selectedId) {
            axios.delete("http://localhost:8080/posts/" + props.selectedId).then(response => {
                props.setFlagState(props.flag + 1);
            }).catch(error => {
                console.log(error.message);
            })
        }
    }

    if (props.selectedId && selectedPost) {
        return (
            <div className="PostDetail">

                <h3><u>{selectedPost.title}</u></h3>
                <div>
                    {selectedPost.author}
                    <br/>
                    <br/>
                    <div style={{textAlign: "left", paddingLeft: '10px'}}>
                        {selectedPost.content}
                    </div>
                    <br/>
                    <div style={{marginBottom: "10px"}}>
                        <button
                            type="button"
                            className="link-button"

                        >
                            edit
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button
                            type="button"
                            className="link-button"
                            onClick={deleteHandler}

                        >
                            delete
                        </button>
                        <div style={{ textAlign: "left", marginLeft: '10px', marginTop: '20px'}}>
                            Comments <br />
                            {postComments.map(c => {
                                return <Comment name={c.name} key={c.id} />
                            })}
                        </div>
                    </div>
                </div>
            </div>);

    } else
        return "";

}
export default PostDetails;