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

//Регистрируем сессию----
session_start();

//Отключаем вывод информационных сообщений
error_reporting(E_ERROR);

define('IN_VPNMS', 1);

include ("includes/config.inc.php");
include ("lang/" . $config['lang'] . ".php");
include ("includes/classes.inc.php");

//Объявляем классы-------
$page = new page();
$db = new DB ();
$sec = new Security ();
$billing = new Billing ();

$page->DisplayHeader();

//проверяем все входящие данные
$_GET = $sec->superslashes($_GET);
$_POST = $sec->superslashes($_POST);

//--------------------------------------------------------------
//        Выбор модуля для загрузки контента
//--------------------------------------------------------------

switch ($_GET[module]) {
	case "":
		include("modules/start.php");
		break;
	case "Start":
		include("modules/start.php");
		break;
	case "Balance":
		include("modules/balance.php");
		break;
	case "Autorization":
		include("modules/auth.php");
		break;
	case "OnLine":
		include("modules/online.php");
		break;
	case "Users":
		include("modules/users.php");
		break;
	case "Groups":
		include("modules/groups.php");
		break;
	case "Admin-cp":
		include("modules/admin-cp.php");
		break;
	case "Login":
		include("modules/login.php");
		break;
	case "Logout":
		include("modules/logout.php");
		break;
	default:
		$page->message($l_message['module_not_found']);
}

$page->DisplayFooter();

?>
