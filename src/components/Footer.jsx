import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, SpeedDial, Backdrop, SpeedDialAction,  } from '@material-ui/core';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ExploreIcon from '@material-ui/icons/Explore';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const actions = [
  { icon: <LocalBarIcon />, name: 'Drinks', to: '/bebidas' },
  { icon: <ExploreIcon />, name: 'Explore', to: '/explorar' },
  { icon: <RestaurantIcon />, name: 'Meals', to: '/comidas' },
];

function Footer() {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = (to) => history.push(to);
  return (
    <Container sx={{ position: 'fixed', bottom: 10, right: -150 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={<MoreHorizIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => handleClick(action.to)}
            />
        ))}
      </SpeedDial>
    </Container>
  );
}

export default Footer;
