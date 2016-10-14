<?php

header('Access-Control-Allow-Origin: *');

$shops = file_get_contents('http://www.silhouette.com/adidasShopfinder/Retailer/GetByDistance?latitude='.$_GET['latitude'].'&longitude='.$_GET['longitude'].'&idBrand=2&maxResults=2000');
$shops = str_replace('shops(', '', $shops);
$shops = str_replace(');', '', $shops);
$locs = json_decode($shops, true);

echo json_encode($locs['results']);
