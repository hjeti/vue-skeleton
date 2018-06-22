import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import Centered from '@storybook/addon-centered';

storiesOf('Tests', module)
  .addDecorator(withKnobs)
  .addDecorator(withNotes)
  .addDecorator(Centered)
  .add('Test', () => ({
    template: `<a @click="log">${text("label", "label")}</a>`,
    methods: {
      log: action('click'),
    }
  }), {notes: 'This is a note'});
