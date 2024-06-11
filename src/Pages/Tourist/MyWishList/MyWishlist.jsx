import useWishlist from "../../../Hooks/useWishlist";


const MyWishlist = () => {
    const [wishList] = useWishlist();
    const totalPrice = wishList.reduce((sum, item) => sum + item.price, 0);
    return (
        <div>
            <h2>Total Price: {totalPrice}</h2>
        </div>
    );
};

export default MyWishlist;