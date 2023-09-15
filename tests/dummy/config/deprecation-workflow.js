/* eslint-disable no-undef */
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    {
      handler: 'silence',
      matchId: 'ember-views.curly-components.jquery-element',
    },
    { handler: 'silence', matchId: 'ember-source.deprecation-without-for' },
    { handler: 'silence', matchId: 'ember-source.deprecation-without-since' },
    { handler: 'silence', matchId: 'ember-component.send-action' },
  ],
};
