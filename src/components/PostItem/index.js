//usando useHistory para poder criar rotas de click via id como parámetro
import { useHistory } from 'react-router-dom';
import './style.css';


const PostItem = ({ post, onUpdate = () => {} }) => {

    const history = useHistory();

    //passando dados via location
    const location = {
        pathname: `/post/${post?.id}`,
        state: post
    }

    return(
    <div className="card col-3" id="card">
        <div className="card-body">
            <div>
                <img src={`https://loremflickr.com/320/240/${post?.title.split(' ').join(',')}`} alt="imagens"/>
            </div>
            <h5 className="card-title">{post?.title}</h5>
            <p className="card-text">{post?.body}</p>
            <button 
                onClick={() => history.push(location)} className="btn btn-primary">
                Ver Post
            </button>
            <button 
            className="btn btn-warning"
            onClick={() => onUpdate(post)}>
                Atualizar Post
            </button>
        </div>
    </div>
    )
}

export default PostItem;