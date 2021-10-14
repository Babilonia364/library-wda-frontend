import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function NavBar({ list }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary py-4">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        {list.map(item => {
          return (
            <Link key={item.name} to={item.path} className="col-3 px-0 text-center">
              <Typography className="text-white d-block d-md-none">{item.name}</Typography>
              <Typography variant="h5" className="text-white d-none d-md-block">{item.name}</Typography>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default NavBar