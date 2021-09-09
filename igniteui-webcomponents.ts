import { IgcAvatarComponent } from './src/components/avatar/avatar.js';
import { IgcBadgeComponent } from './src/components/badge/badge.js';
import { IgcButtonComponent } from './src/components/button/button.js';
import { IgcCheckboxComponent } from './src/components/checkbox/checkbox.js';
import { IgcLinkButtonComponent } from './src/components/button/link-button.js';
import { IgcListHeaderComponent } from './src/components/list/list-header.js';
import { IgcListItemComponent } from './src/components/list/list-item.js';
import { IgcListComponent } from './src/components/list/list.js';
import { IgcSwitchComponent } from './src/components/checkbox/switch.js';
import { IgcNavbarComponent } from './src/components/navbar/navbar.js';
import { IgcIconComponent } from './src/components/icon/icon.js';
import { IgcRadioComponent } from './src/components/radio/radio.js';
import { IgcRadioGroupComponent } from './src/components/radio-group/radio-group.js';
import { IgniteuiWebcomponents } from './src/IgniteuiWebcomponents.js';
import { IgcRippleComponent } from './src/components/ripple/ripple.js';
import { IgcNavDrawerItemComponent } from './src/components/nav-drawer/nav-drawer-item/nav-drawer-item.js';
import { IgcNavDrawerComponent } from './src/components/nav-drawer/nav-drawer.js';
import { IgcNavDrawerHeaderComponent } from './src/components/nav-drawer/nav-drawer-header/nav-drawer-header.js';

window.customElements.define('igniteui-webcomponents', IgniteuiWebcomponents);
window.customElements.define('igc-avatar', IgcAvatarComponent);
window.customElements.define('igc-badge', IgcBadgeComponent);
window.customElements.define('igc-button', IgcButtonComponent);
window.customElements.define('igc-checkbox', IgcCheckboxComponent);
window.customElements.define('igc-link-button', IgcLinkButtonComponent);
window.customElements.define('igc-list', IgcListComponent);
window.customElements.define('igc-list-header', IgcListHeaderComponent);
window.customElements.define('igc-list-item', IgcListItemComponent);
window.customElements.define('igc-switch', IgcSwitchComponent);
window.customElements.define('igc-navbar', IgcNavbarComponent);
window.customElements.define('igc-icon', IgcIconComponent);
window.customElements.define('igc-radio', IgcRadioComponent);
window.customElements.define('igc-radio-group', IgcRadioGroupComponent);
window.customElements.define('igc-ripple', IgcRippleComponent);

window.customElements.define('igc-nav-drawer', IgcNavDrawerComponent);
window.customElements.define('igc-nav-drawer-item', IgcNavDrawerItemComponent);
window.customElements.define(
  'igc-nav-drawer-header',
  IgcNavDrawerHeaderComponent
);
