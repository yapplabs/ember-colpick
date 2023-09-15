/* eslint-disable no-undef */
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [{ handler: 'throw', matchId: 'ember.built-in-components.import' }],
};
