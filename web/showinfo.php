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

//проверяем все входящие данные
$_GET = $sec->superslashes($_GET);
$_POST = $sec->superslashes($_POST);

$page->DisplaySmallHeader();

$db->connect();

$user_power_admin = $sec->is_it_admin($_SESSION['session_login']);

if (empty($_SESSION['session_login'])) 
{
	$page->message($l_message['not_authorized']);
	$page->redirect("index.php?module=Login",$config['redirection_time']);
}
else if ($user_power_admin == false)
	$page->message($l_message['no_access']);
else
{
	if (empty($_GET['action']) OR $_GET['action'] == 'main')
	{
		$billing->ShowMainInfo($_GET['UserName'], $_GET['month']);
	}
	else if ($_GET['action'] == 'connects')
	{      	
    	$billing->ShowConnections($_GET['UserName'], $_GET['orderby'], $_GET['month']);   
	}
	else if ($_GET['action'] == 'hourlystat')
	{
		$billing->ShowHourlyStat($_GET['UserName'], $_GET['month']);
	}
	else if ($_GET['action'] == 'hosts')
	{
		$billing->ShowWWWStat($_GET['UserName'], $_GET['month']);
	}

include ('templates/' . $config['template'] . '/user_info_menu.html');
include ('templates/' . $config['template'] . '/showinfo_footer.html');
}
?>
