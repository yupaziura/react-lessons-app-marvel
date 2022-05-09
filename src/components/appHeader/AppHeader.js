import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

// to create links to swich between pages
// create Link instead a
// or LinkNav to set styles to active component
// instead href use to
// where pass path from Route

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end  
                                 style={({isActive}) => ({color: isActive? 'red' : 'inherit'})}
                                 to='/'>Characters</NavLink></li>
                    /
                    <li><NavLink end  
                                 style={({isActive}) => ({color: isActive? 'red' : 'inherit'})}
                                 to='/comics'>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;