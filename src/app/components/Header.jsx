import { h } from 'preact';
import { pure } from '../../util/pure-component';

function Header(props) {
    return (
        <header>
            <button type="button">Clear</button>
        </header>
    );
}

export default pure(Header);
