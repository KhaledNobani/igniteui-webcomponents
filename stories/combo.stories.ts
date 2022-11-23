import { html } from 'lit';
import { Context, Story } from './story.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { defineAllComponents } from '../src/index.js';
import { faker } from '@faker-js/faker';

defineAllComponents();

// region default
const metadata = {
  title: 'Combo',
  component: 'igc-combo',
  argTypes: {
    value: {
      type: 'string | undefined',
      description: 'The value attribute of the control.',
      control: 'text',
    },
    name: {
      type: 'string',
      description: 'The name attribute of the control.',
      control: 'text',
    },
    scrollIndex: {
      type: 'number',
      control: 'number',
      defaultValue: '0',
    },
  },
};
export default metadata;
interface ArgTypes {
  value: string | undefined;
  name: string;
  scrollIndex: number;
}
// endregion

interface City {
  id: string;
  name: string;
  zip: string;
  country: string;
}

function generateCity(): City {
  const id = faker.datatype.uuid();
  const name = faker.address.cityName();
  const zip = faker.address.zipCode();
  const country = faker.address.country();

  return {
    id,
    name,
    zip,
    country,
  };
}

function generateCities(amount = 200) {
  const result: Array<City> = [];

  for (let i = 0; i <= amount; i++) {
    result.push(generateCity());
  }

  return result;
}

// const itemTemplate = (item: City) => {
//   return html`
//     <div>
//       <b>${item.name}</b>, <span>${item.country}</span>
//     </div>
//   `;
// };

// const headerItemTemplate = (item: City) => {
//   return html`Group header for ${item.country}`;
// };

// .itemTemplate=${itemTemplate}
// .headerItemTemplate=${headerItemTemplate}

const Template: Story<ArgTypes, Context> = (
  { name }: ArgTypes,
  { globals: { direction } }: Context
) => html`
  <igc-combo
    name=${ifDefined(name)}
    dir=${ifDefined(direction)}
    value-key="id"
    display-key="name"
    group-key="country"
    .data=${generateCities(1000)}
  ></igc-combo>
`;

export const Basic = Template.bind({});
