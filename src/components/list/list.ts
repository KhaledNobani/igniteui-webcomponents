import { LitElement, html } from 'lit';

import IgcListHeaderComponent from './list-header.js';
import IgcListItemComponent from './list-item.js';
import { styles } from './themes/light/list.base.css.js';
import { styles as bootstrap } from './themes/light/list.bootstrap.css.js';
import { themes } from '../../theming/theming-decorator.js';
import { registerComponent } from '../common/definitions/register.js';
import { SizableMixin } from '../common/mixins/sizable.js';

/**
 * Displays a collection of data items in a templatable list format.
 *
 * @element igc-list
 *
 * @slot - Renders the list items and list headers inside default slot.
 */
@themes({ light: { bootstrap }, dark: { bootstrap } })
export default class IgcListComponent extends SizableMixin(LitElement) {
  public static readonly tagName = 'igc-list';
  public static override styles = styles;

  public static register() {
    registerComponent(this, IgcListItemComponent, IgcListHeaderComponent);
  }

  public override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'list');
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'igc-list': IgcListComponent;
  }
}
