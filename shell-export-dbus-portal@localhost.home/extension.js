/* # extension.js
 *
 * ## Link
 *
 * * https://github.com/hardpixel/dash-to-plank/blob/master/dash-to-plank%40hardpixel.eu/extension.js
 * * https://gjs.guide/extensions/development/creating.html
 *
 */


import GObject from 'gi://GObject';
import St from 'gi://St';

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import { CoreService } from './service.js'


class MainPortal extends GObject.Object {
	static {
		GObject.registerClass(this);
	}

	constructor (ext, params) {
		super(params);

		this._service  = new CoreService();
	}

	start () {

		this._service.start();

	}

	destroy () {

		this._service.stop();

	}
}

export default class MainExtension extends Extension {

	enable () {

		this._portal = new MainPortal();

		this._portal.start();

	}

	disable () {

		this._portal.destroy();
		this._portal = null;

	}

}
