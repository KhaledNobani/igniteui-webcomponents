import { html, LitElement } from 'lit';
import { property, queryAssignedNodes } from 'lit/decorators.js';
import { blazorSuppress } from '../common/decorators';
import { IgcRadioComponent } from '../radio/radio';
import { styles } from './radio-group.css';

export class IgcRadioGroupComponent extends LitElement {
  static styles = styles;

  @queryAssignedNodes(undefined, true, 'igc-radio')
  _slottedRadios!: NodeListOf<IgcRadioComponent>;

  private get radios() {
    return Array.from(this._slottedRadios).filter((radio) => !radio.disabled);
  }

  private get isLTR(): boolean {
    const styles = window.getComputedStyle(this);
    return styles.getPropertyValue('direction') === 'ltr';
  }

  constructor() {
    super();
    this.addEventListener('keydown', this.handleKeydown);
  }

  @property({ reflect: true })
  alignment: 'vertical' | 'horizontal' = 'vertical';

  @blazorSuppress()
  handleKeydown = (event: KeyboardEvent) => {
    const { key } = event;

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      const checked = this.radios.find((radio) => radio.checked);
      let index = this.radios.indexOf(checked!);

      switch (key) {
        case 'ArrowUp':
          index += -1;
          break;
        case 'ArrowLeft':
          index += this.isLTR ? -1 : 1;
          break;
        case 'ArrowRight':
          index += this.isLTR ? 1 : -1;
          break;
        default:
          index += 1;
      }

      if (index < 0) index = this.radios.length - 1;
      if (index > this.radios.length - 1) index = 0;

      this.radios.forEach((radio) => (radio.checked = false));
      this.radios[index].focus();
      this.radios[index].checked = true;

      event.preventDefault();
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}
