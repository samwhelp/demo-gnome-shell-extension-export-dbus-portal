/* # service.js
 *
 * ## Link
 *
 * * https://github.com/hardpixel/dash-to-plank/blob/master/dash-to-plank%40hardpixel.eu/launcher.js
 * * https://gjs.guide/guides/gio/dbus.html
 *
 */


import GLib from 'gi://GLib'
import Gio from 'gi://Gio'
import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import * as Utils from './utils.js'

const DBUS_NAME = 'org.gnome.Shell.Extensions.ShellExportDbusPortal'
const DBUS_PATH = '/org/gnome/Shell/Extensions/ShellExportDbusPortal'


class DbusInterface {

	enable () {

		this.dbus = Utils.dbusObject(DBUS_NAME, DBUS_PATH, this);

	}

	disable () {

		this.dbus?.flush();
		this.dbus?.unexport();

		delete this.dbus;

	}

	ToggleShowApplications () {

		if (Main.overview.visible) {
			Main.overview.hide();
			return
		}

		if (Main.overview.showApps) {
			Main.overview.showApps();
		} else {
			Main.overview.viewSelector.showApps();
		}

	}

	ToggleShowActivities () {

		Main.overview.toggle();

	}


}

export class CoreService {

	constructor () {

		this.dbus = new DbusInterface()

	}

	start () {

		this.dbus?.enable()
	}

	stop () {

		this.dbus?.disable();

	}
}
