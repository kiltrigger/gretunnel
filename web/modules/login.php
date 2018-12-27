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

if (!defined('IN_VPNMS')) exit;

if (empty($_GET["action"])) 
	include ('templates/' . $config['template'] . '/auth_form.html');

if (!empty($_GET["action"])) 
{
	if ($_GET["action"] == "enter") 
	{
    	if ( $_POST["login"] && $_POST["auth_passwd"] ) 
    	{
        	if ( $sec->LogIn($_POST["login"], $_POST["auth_passwd"]) == true ) 
        	{
            	$content = $l_message['login'] . " <b>" . $_POST["login"] . "</b>";
                $page->message($content);
                $_SESSION['session_login'] = $_POST["login"];
                $page->redirect("index.php?module=Start",$config['redirection_time']);
            }
            if ($sec->LogIn($_POST["login"], $_POST["auth_passwd"]) == false) 
            {
            	$page->message($l_errors['err_user_pass']);
                $page->redirect("index.php?module=Login",$config['redirection_time']);
            }
        }
        else 
        {
        	$page->message($l_errors['no_user_pass']);
            $page->redirect("index.php?module=Login",$config['redirection_time']);
        }
        
    }
}

?>