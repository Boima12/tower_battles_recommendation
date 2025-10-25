import PropTypes from 'prop-types';
import styles from './tower_panel.module.css';
import { useNavigate } from 'react-router-dom';

import scoutImg from '~/src/assets/images/Scout.webp';
import creditsIconImg from '~/src/assets/images/CreditsIcon.png';

function Co_tower_panel({
    towerId = 0,
    tower_icon = scoutImg,
    name = 'Default Name',
    placement_price = 0,
    unlock_price = 0
}) {

    const navigate = useNavigate();

    const handleTowerPanel = () => {
        navigate(`/pages/detail/${towerId}`);
    };

    return (
        <button type="button" className={styles.main} onClick={handleTowerPanel}>
            <img src={tower_icon} alt="tower icon" className={styles.tower_icon} />

            <div className={styles.tower_intro}>
                <p className={styles.name}>{name}</p>
                <p className={styles.placement_price}>${placement_price}</p>

                <div className={styles.credit_section}>
                    <img src={creditsIconImg} alt="credits icon" className={styles.credits_icon} />
                    <p className={styles.unlock_price}>{unlock_price}</p>
                </div>
            </div>
        </button>
    );
}

// propTypes
Co_tower_panel.propTypes = {
    towerId: PropTypes.number,
    tower_icon: PropTypes.string,
    name: PropTypes.string,
    placement_price: PropTypes.number,
    unlock_price: PropTypes.number,
};

export default Co_tower_panel;