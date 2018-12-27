<?
//известные данные
$username = "Mihan";
$url = "http://10.0.15.5:5006";
$mpd_user = "admin";
$mpd_pass = "pass"; 

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_USERPWD, $mpd_user.":".$mpd_pass);

$parts = explode ("<TR>" ,curl_exec($ch));

for ($i = 0; $i < count($parts); $i++)
{
	if (strpos($parts[$i], "auth\">". $username ."</a>") != '')
	{
		$part = $parts[$i];
		break;
	}		
}

if (!empty($part))
{
	$parts = explode ("link\">" ,$part);

	for ($i = 0; $i < count($parts); $i++)
	{
		if (strpos($parts[$i], "auth\">". $username ."</a>") != '')
		{
			$part = $parts[$i];
			break;
		}		
	}

	$parts = explode ("</a></TD>" ,$part);
	$link = $parts[0];

	$close_url = $url ."/cmd?link%20". $link ."&close";

	//echo $close_url;

	curl_setopt($ch, CURLOPT_URL, $close_url);
	curl_exec($ch);
}

curl_close($ch);
?>
