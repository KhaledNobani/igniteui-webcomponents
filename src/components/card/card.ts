import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styles } from './card.material.css';

export class IgcCard extends LitElement {
  static styles = styles;

  constructor() {
    super();
    this.setAttribute('role', 'group');
  }

  @property({ type: Boolean, reflect: true })
  outlined = false;

  render() {
    const classes = {
      container: true,
      outlined: this.outlined,
    };

    return html`
      <div class="${classMap(classes)}">
        <slot></slot>
      </div>
    `;
  }
}
