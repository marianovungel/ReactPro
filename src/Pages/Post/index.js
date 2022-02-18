//pegar os dados enviados via location
import { useEffect } from 'react';
//renderizar os dados enviados
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
//importar api
import api from '../../Services/api'
   
const Post = () =>{

    //usar o useHistory para redirecionamento
    const history = useHistory();

    //criando o state
    const [post, setPost] = useState({});

    //state para listar os comentários
    const [comments, setComments] = useState([]);

    //pegar os dados com a variável location
    const location = useLocation();
//usando sweet alert para (modal), para expluir um determinado post
    const confirmDelete= async () => {
        const { isConfirmed } = await Swal.fire({
            title: `Deletar ${post?.title}`,
            text: "Esta ação não poderá ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, tenho certeza!',
            cancelButtonText: "Cancelar"
          });

          if(isConfirmed){
              deletePost();
          }
    };
//deletar post
    const deletePost = async() => {
        try{
            await api.delete(`/posts/${post?.id}`);
            history.goBack();
        }catch(err){
            alert(err.message);
        }
    };

    //listar comentários
    const getComments = async () => {
        try{
            const { data: res } = await api.get(`/posts/${post?.id}/comments`);
            setComments(res);
        }catch(err){
            alert(err.message);
        }
    }

    useEffect(() => {
        setPost(location.state);
    }, []);

    useEffect(() => {
        if(post?.id){
            getComments();
        }
    }, [post?.id]);

    return(
        <div className="container pt-5">
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
            <button onClick={() => confirmDelete()} className="btn btn-block btn-lg btn-danger">
                Excluir Post
            </button>

            <ul 
            className="mt-5"
            style={{
                listStyle: "none",
                paddingLeft: 0,
                margingTop: 50
            }}>
            {comments?.map((comment) => (
                <li className="mt-2">
                    <b className="d-block">{comment?.email}</b>
                    <small>{comment?.body}</small>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Post;