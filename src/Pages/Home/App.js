//usar useEffect para poder carregar os postes sempre que o componente ser criado
//criar um useStates para poder renderisar as requisições na tela
//deistruturando o react para poder pegar os dois hooks
import { useEffect, useState } from 'react'
import PostItem from '../../components/PostItem';
//primeiro importa a instancia do axios(api)
import api from '../../Services/api'
import './App.css';

const App = () =>{

  //criar o stats
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({
    userId: 1,
    title: "",
    body: "",
  });

  //criar uma função para fazer a requisição
  //por ser uma requesição, faremos uma função assincrona (async-await)
  const getPosts = async() =>{
    //usaremos um try e catch para tratamento de erro nesta requisição
    try{
      //armasenar a requisição em uma variável
      const {data: res} =await api.get("/posts");
      setPosts(res);
    }catch(err){
      alert(err.message);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      getPosts();
    }, 1*1000);
  }, []);

  //função para atualizar a  função

  const savePost = async() =>{
    try{

      if(post?.body === "" || post?.title === ""){
        alert('Preencha todos os campos!')
        return false;
      }
//fazer uma requisição para cadastrar
      const { data: res} = await api.post("/posts", post);
      //passar os dados do ccadastro  o arrei do state para ser renderizado primeiro
      setPosts([res, ...posts]);

    }catch(err){
      alert(err.message);
    }
  }

  const updatePost = async() =>{
    try{

      if(post?.body === "" || post?.title === ""){
        alert('Preencha todos os campos!')
        return false;
      }
//fazer uma requisição para cadastrar
      const { data: res} = await api.put(`posts/${post?.id}`, post);
      //passar os dados do ccadastro  o arrei do state para ser renderizado primeiro
      //setPosts([res, ...posts]);
      //atualizar componente  pelo id
      const postIndex = posts.findIndex((p) => p?.id === post?.id);

      //copiar os postes
      let newPost = posts;
      //atualizar a lista no ponto  do index
      newPost[postIndex]=res;
      setPosts([]);
      setTimeout(() => setPosts(newPost), 1000*3);

    }catch(err){
      alert(err.message);
    }
  }

  //criando o useEffect para fazer a requesição assim que o componente ser criado

  return (
    <div className="container-fluid pt-5">
      <div className="col-1 mb-5" id="cadastro">
        <input 
        onChange={(e) => setPost({ ...post, title: e.target.value})}
        value={post?.title} type="text" className="form-control mb-2" placeholder="Title"/>
        <textarea id="text" 
        value={post?.body} onChange={(e) => setPost({ ...post, body: e.target.value})} className="from-control mb-2" placeholder="Descrição" >
        </textarea>
        <br/>
        <button id="button"
        onClick={() => Boolean(post?.id) ? updatePost() : savePost()}
        className={ `btn btn-block btn-${Boolean(post?.id) ? "warning" : "success"}`}
        >{Boolean(post?.id) ? "Atualizar" : "Cadastrar"}
        </button>
      </div>
      <div className="row">
        {posts?.length === 0 && <h1>Carregando...</h1>}
      {posts?.map((post) => (
        <PostItem post={post} onUpdate={(post) => setPost(post)} />
      ))}
      </div>
    </div>
  );
}

export default App;
