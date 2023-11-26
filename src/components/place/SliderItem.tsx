import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FC, PropsWithChildren, useState } from 'react';

type SliderItemProps = {
    onClick: () => void;
};

export const SliderItem: FC<PropsWithChildren<SliderItemProps>> = ({ onClick, children }) => {
    const [heartClicked, setHeartClicked] = useState<boolean>(false);
    const [cartClicked, setCartClicked] = useState<boolean>(false);

    const onHeartClick = () => {
        setHeartClicked(!heartClicked);
    };

    const onCartClick = () => {
        setCartClicked(!cartClicked);
    };

    return (
        <div>
            <div onClick={onClick} className="cursor-pointer text-3xl text-blue-400">
                {children}
            </div>
            <div className="flex justify-end items-end">
                <FontAwesomeIcon
                    className="hover:cursor-pointer"
                    icon={faHeart}
                    size="2xl"
                    style={{ color: heartClicked ? '#ff3050' : '#c2c2c2' }}
                    onClick={onHeartClick}
                />

                <FontAwesomeIcon
                    className="hover:cursor-pointer"
                    icon={faShoppingBag}
                    size="2xl"
                    style={{ color: cartClicked ? '#ff3050' : '#c2c2c2' }}
                    onClick={onCartClick}
                />
            </div>
        </div>
    );
};
