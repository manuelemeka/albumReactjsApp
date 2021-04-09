import './index.css';
import { defaultColor, getCurrentColor } from './util/util';

const color =  getCurrentColor() ?? defaultColor;


const render = () => {
  import(`./assets/scss/${color}.custom.scss`).then(() => {
    require('./AppRenderer');
  });
};
render();

