<?php

namespace YTAHA\IntelliBuilder\Utils;

use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class GeoIP
{
	use SingletonTrait;

	protected $country = '';
	protected $city = '';

	public function __construct()
	{
		$this->getUserLocation();
	}

	private function getUserLocation()
	{
		$ip = $this->getIPAddress();
		$url = "http://ip-api.com/json/156.174.50.176";
		$response = file_get_contents($url);
		$data = json_decode($response, true);

		if ($data['status'] === 'success') {
			$this->country = strtolower($data['country']);
			$this->city = strtolower($data['city']);
		}
	}

	public function getCountry()
	{
		return $this->country;
	}

	public function getCity()
	{
		return $this->city;
	}

	private function getIPAddress()
	{
		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else {
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		return $ip;
	}
}
