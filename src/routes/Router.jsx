import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Publishers from "../views/Publishers";
import Users from "../views/Users";
import Books from "../views/Books";
import Rents from "../views/Rents";
import NavBar from "../components/NavBar";

function CustomRouter() {
  const list = [
    { name: "Usuários", path: "/users" },
    { name: "Editoras", path: "/publishers" },
    { name: "Livros", path: "/books" },
    { name: "Aluguéis", path: "/rents" },
  ];


  return (
    <Router>
      <NavBar list={list} />
      <Switch>
        <Route path="/users" name="Usuários" exact component={Users} />
        <Route path="/publishers" name="Publishers" exact component={Publishers} />
        <Route path="/books" name="Livros" exact component={Books} />
        <Route path="/rents" name="Aluguéis" exact component={Rents} />
      </Switch>
    </Router>
  );
}

export default CustomRouter;