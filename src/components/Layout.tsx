import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Build, FitnessCenter, Language, Security, Warning, Work } from '@material-ui/icons';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import Link from 'next/link';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    appBarButtons: {
      marginLeft: 'auto',
    },
    globalMenuButton: {
      maxHeight: 36,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          { key: 'item', linkName: 'アイテム', icon: <Work />, href: '/items' },
          { key: 'skill', linkName: 'スキル', icon: <Build />, href: '/skills' },
          { key: 'monster', linkName: 'モンスター', icon: <Warning />, href: '/monsters' },
          {
            key: 'dungeon',
            linkName: 'ダンジョン',
            icon: <TransferWithinAStationIcon />,
            href: '/dungeons',
          },
          { key: 'quest', linkName: 'クエスト', icon: <FitnessCenter />, href: '/quests' },
          { key: 'guild', linkName: 'ギルド', icon: <Security />, href: '/guild' },
          { key: 'korea', linkName: '韓国情報', icon: <Language />, href: '/korea' },
        ].map((obj) => (
          <Link key={obj.key} href={obj.href} passHref>
            <ListItem button key={obj.key} component="a">
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.linkName} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            RedStone ファンサイト
          </Typography>
          <ButtonGroup color="primary" className={classes.appBarButtons}>
            {router.pathname !== '/' && (
              <Link href="/" passHref>
                <Button color="inherit" className={classes.globalMenuButton}>
                  ホーム
                </Button>
              </Link>
            )}
            <Link href="/calculator" passHref>
              <Button color="inherit" className={classes.globalMenuButton}>
                計算機
              </Button>
            </Link>
            <Link href="/links" passHref>
              <Button color="inherit" className={classes.globalMenuButton}>
                リンク集
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button color="inherit" className={classes.globalMenuButton}>
                コンタクト
              </Button>
            </Link>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
