<?
/*
 *   VPN Management System
 *   Copyright (C) 2005-2010  Andrey Chebotarev <admin@vpnms.org>
 *   All rights reserved.
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/*
:::     ::: :::::::::  ::::    ::: ::::    ::::   ::::::::
:+:     :+: :+:    :+: :+:+:   :+: +:+:+: :+:+:+ :+:    :+:
+:+     +:+ +:+    +:+ :+:+:+  +:+ +:+ +:+:+ +:+ +:+
+#+     +:+ +#++:++#+  +#+ +:+ +#+ +#+  +:+  +#+ +#++:++#++
 +#+   +#+  +#+        +#+  +#+#+# +#+       +#+        +#+
  #+#+#+#   #+#        #+#   #+#+# #+#       #+# #+#    #+#
    ###     ###        ###    #### ###       ###  ########
*/

if (!defined('IN_VPNMS'))
	die("");

//---------------------------------------------------------
//                DB configuration
//---------------------------------------------------------
$config['db_name'] = "vpnms";
$config['db_host'] = "10.0.15.5";
$config['db_user'] = "root";
$config['db_passwd'] = "";

//---------------------------------------------------------
//                 Path
//---------------------------------------------------------
$config['reports_path'] = "/tmp/reports/";

//---------------------------------------------------------
//                 VPNMS config
//---------------------------------------------------------
$config['template'] = "default";
$config['lang'] = "ru";
$config['redirection_time'] = "20";
$config['mb'] = 1024;
$config['precision'] = 2;
$config['time_correction'] = 0;
$config['session_ttl'] = 5 * 60;
$config['unix_time'] = mktime();
$config['active_session'] = 2048;
$config['active_ses_refresh'] = 10;
//mpd
$config['mpd_url'] = "http://10.0.15.5:5006";
$config['mpd_user'] = "admin";
$config['mpd_pass'] = "pass";

?>

