import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>

        {/* Left side - User actions */}
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Polls
          </Button>
        </Box>

        {/* Right side - Admin actions */}
        <Button color="inherit" component={Link} to="/create">
          Create Poll
        </Button>

        <Button color="inherit" component={Link} to="/admin">
          Admin
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
