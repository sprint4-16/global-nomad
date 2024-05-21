import classNames from 'classnames/bind';
import styles from './NavItems.module.scss';

const cn = classNames.bind(styles);

import { ButtonLogin, ButtonRegister, ButtonAlertIcon, ButtonProfile } from './items';

export default function NavItems() {
  const loggeninStatus = false;
  return (
    <>
      {loggeninStatus ? (
        <div className={cn('loggedOutComponent', 'navItems')}>
          <ButtonLogin className={cn('buttonLogin')} />
          <ButtonRegister className={cn('ButtonRegister')} />
        </div>
      ) : (
        <div className={cn('loggedInComponent', 'navItems')}>
          <ButtonAlertIcon className={cn('ButtonAlertIcon')} />
          <ButtonProfile className={cn('ButtonProfile')} />
        </div>
      )}
    </>
  );
}
