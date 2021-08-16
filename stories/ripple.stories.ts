import { html } from 'lit-html';
import '../igniteui-webcomponents.js';
import { Context, Story } from './story.js';

// region default
export default {
  title: 'Ripple',
  component: 'igc-ripple',
};
// endregion

const Template: Story<null, Context> = () => html`
  <igc-button>
    <igc-ripple></igc-ripple>
    Button with ripple
  </igc-button>

  <h1 style="position: relative">
    Some default browser element
    <igc-ripple></igc-ripple>
  </h1>
`;

export const Basic = Template.bind({});
