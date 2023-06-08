import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [data, setData] = useState<any>();

    function toggle() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle,
        data,
        setData
    }
};

export default useModal;