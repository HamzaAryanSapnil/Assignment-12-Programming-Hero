
import PropTypes from 'prop-types'
const Container = ({children}) => {
    return (
        <div className="max-w-[2550px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 box-border" >
            {children}
        </div>
    );
};
Container.propTypes = {
    children: PropTypes.node,
}
export default Container;