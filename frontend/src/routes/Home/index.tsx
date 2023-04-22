const Home = (props : {name : string}) => {

  return ( 
    <div>
      {props.name ? 'Bem vindo ' + props.name : 'Voce não está logado...' }
    </div>
  );
}
 
export default Home;