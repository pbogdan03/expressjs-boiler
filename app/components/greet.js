"use strict";

import config from '../config.json';

var container = document.getElementsByClassName('container')[0];
var el = document.createElement('div');

el.textContent = config.greet;

container.appendChild(el);