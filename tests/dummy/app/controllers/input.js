import { A } from '@ember/array';
import Controller from '@ember/controller';

export default class extends Controller {
  colorScheme = 'dark';
  layout = 'full';
  layouts = A(['full', 'hex', 'rgbhex']);
  colorSchemes = A(['dark', 'light']);
}
