<?php
global $config;

function getTimeForCard ($value) {
  $d = DateTime::createFromFormat('Y-m-d H:i:s', $value);
  if ($d === false) {
    return time();
  } else {
    return $d->getTimestamp();
  }
}

function findOutTheInnerSerialId ($kpid) {
  $apiToken = 'dhYHeqruV5o7oint21ggMMIUBaDE0Rm6';
  $api = "https://videocdn.tv/api/short?kinopoisk_id=$kpid&api_token=$apiToken";
  $data = json_decode(file_get_contents($api), true);
  if ($data['data'][0]['id']) {
    return $data['data'][0]['id'];
  }
  else return false;
}

function getFeedDataByKpid ($videocdnSerialId) {
  $apiLimit = 2;
  $apiToken = 'dhYHeqruV5o7oint21ggMMIUBaDE0Rm6';
  $api = "https://videocdn.tv/api/tv-series/episodes?tv_series_id=$videocdnSerialId&ordering=ru_released&direction=desc&limit=$apiLimit&page=1&api_token=$apiToken";
  $data = json_decode(file_get_contents($api), true);
  return $data;
}

function generateFeedByKpid($kpid) {
  $videocdnSerialId = findOutTheInnerSerialId($kpid);
  if ($videocdnSerialId) {
    $episodesData = getFeedDataByKpid($videocdnSerialId);
    if ($episodesData['result'] <= 0) return false;

    $episodes = [];

    foreach($episodesData['data'] as $key => $value) {
      $episodes[] = [
        'episode' => $value['num'],
        'season' => $value['season_num'],
        'kinopoiskId' => $value['kinopoisk_id'],
        'nameRu' => $value['ru_title'] ? $value['ru_title'] : $value['orig_title'],
        'time' => getTimeForCard($value['created'])
      ];
    }
    // inclide Array items sort by episodes
    return $episodes;
    return false;
  } else {
    return false;
  }
}

$filename = $config['mainAppUrl'] . '/api/method/watch.getSubscriptions?v=1.0&jwt=' . $args['jwt'] . '&client_id=' . $args['client_id'];

$subscriptionsData = json_decode(file_get_contents($filename), true);

$kpidList = [];
$feedData = [
  'code' => 404,
  'total' => 0,
  'content' => [],
  'binding' => []
];

/* IF !$subscriptionsData['content'] */
if ($subscriptionsData['total'] <= 0) return $feedData;

foreach ($subscriptionsData['content'] as $key => $value) {
  if ($value['type'] == 'TV_SERIES') {
    if (!in_array($value['kinopoiskId'], $kpidList)) {
      $kpidList[] = $value['kinopoiskId'];
      $feedData['binding'][$value['kinopoiskId']] = $value;
    }
  }
}

if (count($kpidList) <= 0) return $feedData;

foreach ($kpidList as $kpid) {
  $feedByKpid = generateFeedByKpid($kpid, $feedData['binding'][$kpid]['year'], $feedData['binding'][$kpid]['nameRu']);
  if ($feedByKpid !== false) {
    $feedData['content'] = [...$feedData['content'], ...$feedByKpid];
  }
}

$feedDataContentCount = count($feedData['content']);

if ($feedDataContentCount <= 0) return $feedData;

$feedData['code'] = 200;
$feedData['total'] = $feedDataContentCount;

$responce = $feedData;
