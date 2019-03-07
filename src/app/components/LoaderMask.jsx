import { h } from 'preact';
import { pure } from '../../util/pure-component';

const Mask = pure(function Mask(props) {
    return props.show === true ? (
        <div class="mask">
            <span>
                <img src="dist/assets/loader.svg" width="100" />
            </span>
        </div>
    ) : null;
});

export default pure(function LoaderMask(props) {
    return (
        <div class="loader">
            {props.children}
            <Mask show={props.loading} />
        </div>
    );
});
