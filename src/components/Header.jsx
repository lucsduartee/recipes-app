import React, { useContext } from 'react';
import P from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, AppBar, Typography } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Search from '@material-ui/icons/Search';
import GlobalContext from '../context/GlobalContext';

function Header({ title = '', hasBtn = true }) {
  const { setShowBar } = useContext(GlobalContext);
  return (
    <Box>
      <AppBar
        position="static"
        sx={ {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 1,
          paddingRight: 1,
        } }
      >
        <Link to="/perfil">
          <AccountCircle
            sx={{
              color: '#FFF',
              fontSize: 45,
            }}
          />
        </Link>
        <Typography variant="h5">{ title }</Typography>
        {
          hasBtn
          && (
              <Search
                onClick={ () => setShowBar((s) => !s) }
                sx={{
                  color: '#FFF',
                  fontSize: 45,
                }}
              />
          )
        }
      </AppBar>
    </Box>
  );
}

Header.propTypes = {
  title: P.string.isRequired,
  hasBtn: P.bool.isRequired,
};

export default Header;
