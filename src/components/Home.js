import "../App.css";
import TodoWrapper from "./Todo/TodoWrapper";

const Home = () => {
  return (
    <div className="App overflow-auto">
      <div className="col-8 col-md-6 mx-auto bg-white p-4 my-4 rounded-3 fixed-max-width">
        <h1 className="text-center mb-3">Todo App</h1>
        <TodoWrapper />
      </div>
    </div>
  );
};

export default Home;
