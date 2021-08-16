import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Constructor } from './constructor';

export declare class SizableInterface {
  size: 'small' | 'medium' | 'large';
}

export const SizableMixin = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class SizableElement extends superClass {
    /**
     * Determines the size of the component.
     * @type {"small"|"medium"|"large"}
     */
    @property({ reflect: true })
    size: 'small' | 'medium' | 'large' = 'large';
  }
  return SizableElement as Constructor<SizableInterface> & T;
};
