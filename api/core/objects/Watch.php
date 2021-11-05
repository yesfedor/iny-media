<?php
function WatchAddContentByData (array $contentPDOFromat) {
  if (!$contentPDOFromat[':kinopoiskId']) return false;
  $query = "INSERT INTO WatchContent (`id`, `kinopoiskId`, `imdbId`, `nameRu`, `nameEn`, `posterUrl`, `posterUrlPreview`, `ratingKinopoisk`,
            `ratingKinopoiskVoteCount`, `ratingFilmCritics`, `ratingFilmCriticsVoteCount`, `year`, `filmLength`, `slogan`, `description`,
            `shortDescription`, `type`, `ratingAgeLimits`, `startYear`, `endYear`, `countries`, `genres`) VALUES (NULL, :kinopoiskId,
            :imdbId, :nameRu, :nameEn, :posterUrl, :posterUrlPreview, :ratingKinopoisk, :ratingKinopoiskVoteCount, :ratingFilmCritics,
            :ratingFilmCriticsVoteCount, :year, :filmLength, :slogan, :description, :shortDescription, :type, :ratingAgeLimits,
            :startYear, :endYear, :countries, :genres)";

  return dbAddOne($query, $contentPDOFromat);
}

function WatchGetDataFrom_KinopoiskApiUnofficial_ByKpid (int $kpid) {
  $ch = curl_init();
  $headers = array('accept: application/json', 'x-api-key: eb24ca56-16a8-49ec-91b2-3367940d4c3e');

  curl_setopt($ch, CURLOPT_URL, 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'.$kpid); # URL to post to
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); # return into a variable
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); # custom headers, see above
  $data = curl_exec($ch); # run!
  curl_close($ch);
  $content = json_decode($data, true);

  return $content;
}

function WatchAddDbIfExitsByKpid (int $kpid) {
  $query = "SELECT * FROM WatchContent WHERE kinopoiskId = :kinopoiskId";
  $var = [
    ':kinopoiskId' => $kpid
  ];

  $content = dbGetOne($query, $var);

  if ($content['kinopoiskId']) return true;

  $kinopoiskApiUnofficialData = WatchGetDataFrom_KinopoiskApiUnofficial_ByKpid($kpid);

  if(!$kinopoiskApiUnofficialData['kinopoiskId']) return false;

  // Format Data
  $allowType = ['FILM', 'VIDEO', 'TV_SERIES', 'MINI_SERIES', 'TV_SHOW'];
  if (in_array($kinopoiskApiUnofficialData['type'], $allowType)) $type = $kinopoiskApiUnofficialData['type'];
  else $type = $allowType[0];

  $ratingAgeLimits = str_replace('age', '', $kinopoiskApiUnofficialData['ratingAgeLimits']);

  $countries = [];
  foreach ($kinopoiskApiUnofficialData['countries'] as $key => $value) {
    $countries[] = $value['country'];
  }
  $countries = implode(',', $countries);

  $genres = [];
  foreach ($kinopoiskApiUnofficialData['genres'] as $key => $value) {
    $genres[] = $value['genre'];
  }
  $genres = implode(',', $genres);

  $contentPDOFromat = [
    ':kinopoiskId' => ($kinopoiskApiUnofficialData['kinopoiskId'] ? $kinopoiskApiUnofficialData['kinopoiskId'] : 0),
    ':imdbId' => ($kinopoiskApiUnofficialData['imdbId'] ? $kinopoiskApiUnofficialData['imdbId'] : 'tt0'),
    ':nameRu' => ($kinopoiskApiUnofficialData['nameRu'] ? $kinopoiskApiUnofficialData['nameRu'] : 'Empty'),
    ':nameEn' => ($kinopoiskApiUnofficialData['nameEn'] ? $kinopoiskApiUnofficialData['nameEn'] : 'Empty'),
    ':posterUrl' => ($kinopoiskApiUnofficialData['posterUrl'] ? $kinopoiskApiUnofficialData['posterUrl'] : ''),
    ':posterUrlPreview' => ($kinopoiskApiUnofficialData['posterUrlPreview'] ? $kinopoiskApiUnofficialData['posterUrlPreview'] : ''),
    ':ratingKinopoisk' => ($kinopoiskApiUnofficialData['ratingKinopoisk'] ? $kinopoiskApiUnofficialData['ratingKinopoisk'] : 0.0),
    ':ratingKinopoiskVoteCount' => ($kinopoiskApiUnofficialData['ratingKinopoiskVoteCount'] ? $kinopoiskApiUnofficialData['ratingKinopoiskVoteCount'] : 0),
    ':ratingFilmCritics' => ($kinopoiskApiUnofficialData['ratingFilmCritics'] ? $kinopoiskApiUnofficialData['ratingFilmCritics'] : 0.0),
    ':ratingFilmCriticsVoteCount' => ($kinopoiskApiUnofficialData['ratingFilmCriticsVoteCount'] ? $kinopoiskApiUnofficialData['ratingFilmCriticsVoteCount'] : 0),
    ':year' => ($kinopoiskApiUnofficialData['year'] ? $kinopoiskApiUnofficialData['year'] : 0),
    ':filmLength' => ($kinopoiskApiUnofficialData['filmLength'] ? $kinopoiskApiUnofficialData['filmLength'] : 0),
    ':slogan' => ($kinopoiskApiUnofficialData['slogan'] ? $kinopoiskApiUnofficialData['slogan'] : ''),
    ':description' => ($kinopoiskApiUnofficialData['description'] ? $kinopoiskApiUnofficialData['description'] : ''),
    ':shortDescription' => ($kinopoiskApiUnofficialData['shortDescription'] ? $kinopoiskApiUnofficialData['shortDescription'] : ''),
    ':type' => $type,
    ':ratingAgeLimits' => ($ratingAgeLimits ? $ratingAgeLimits : '16'),
    ':startYear' => ($kinopoiskApiUnofficialData['startYear'] ? $kinopoiskApiUnofficialData['startYear'] : 0),
    ':endYear' => ($kinopoiskApiUnofficialData['endYear'] ? $kinopoiskApiUnofficialData['endYear'] : 0),
    ':countries' => ($countries ? $countries : ''),
    ':genres' => ($genres ? $genres : '')
  ];
  
  return WatchAddContentByData($contentPDOFromat);
}

function WatchGetByKpid (int $kpid) {
  WatchAddDbIfExitsByKpid($kpid);

  $query = "SELECT * FROM WatchContent WHERE kinopoiskId = :kinopoiskId";
  $var = [
    ':kinopoiskId' => $kpid
  ];

  return dbGetOne($query, $var);
}

function WatchAddSimilarsByData (int $kpid, array $contentFromat) {
  if (!$kpid or !$contentFromat[0]) return false;

  foreach ($contentFromat as $key) {
    WatchGetByKpid($key);
  }

  $kinopoiskIdList = implode(',', $contentFromat);

  $query = "INSERT INTO `WatchSimilars` (`id`, `kinopoiskId`, `kinopoiskIdList`, `time`) VALUES (NULL, :kinopoiskId, :kinopoiskIdList, :time)";
  $var = [
    ':kinopoiskId' => $kpid,
    ':kinopoiskIdList' => $kinopoiskIdList,
    ':time' => time()
  ];

  return dbAddOne($query, $var);
}

function WatchJoinSimilars ($sequelsAndPrequels, $similars) {
  if (!array_key_exists('total', $sequelsAndPrequels)) $sequelsAndPrequels = ['total' => 0, 'items' => []];
  if (!array_key_exists('total', $similars)) $similars = ['total' => 0, 'items' => []];
  if (!$sequelsAndPrequels['total'] and !$similars['total']) return ['total' => 0, 'items' => []];
  if (!$sequelsAndPrequels['total']) return $similars;
  if (!$similars['total']) return $sequelsAndPrequels;

  $content = [
    'total' => intval($sequelsAndPrequels['total']) + intval($similars['total']),
    'items' => array_merge($sequelsAndPrequels['total'], $similars['total'])
  ];

  return $content;
}

function WatchGetSimilarsFrom_KinopoiskApiUnofficial_ByKpid (int $kpid) {
  // similars
  $ch = curl_init();
  $headers = array('accept: application/json', 'x-api-key: eb24ca56-16a8-49ec-91b2-3367940d4c3e');
  curl_setopt($ch, CURLOPT_URL, 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'.$kpid.'/similars'); # URL to post to
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); # return into a variable
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); # custom headers, see above
  $data = curl_exec($ch); # run!
  curl_close($ch);
  $contentSimilars = json_decode($data, true);

  // sequels_and_prequels
  $ch = curl_init();
  $headers = array('accept: application/json', 'x-api-key: eb24ca56-16a8-49ec-91b2-3367940d4c3e');
  curl_setopt($ch, CURLOPT_URL, 'https://kinopoiskapiunofficial.tech/api/v2.1/films/'.$kpid.'/sequels_and_prequels'); # URL to post to
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); # return into a variable
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); # custom headers, see above
  $data = curl_exec($ch); # run!
  curl_close($ch);
  $contentSequelsAndPrequels = json_decode($data, true);

  $content = WatchJoinSimilars($contentSequelsAndPrequels, $contentSimilars);
  return $content;
}

function WatchAddSimilarsDbIfExitsByKpid (int $kpid) {
  $query = "SELECT * FROM WatchSimilars WHERE kinopoiskId = :kinopoiskId";
  $var = [
    ':kinopoiskId' => $kpid
  ];
  $content = dbGetOne($query, $var);

  if ($content['time']) return true;

  $kinopoiskApiUnofficialData = WatchGetSimilarsFrom_KinopoiskApiUnofficial_ByKpid($kpid);

  if (!$kinopoiskApiUnofficialData['total']) return false;
  $kinopoiskIdList = [];
  foreach ($kinopoiskApiUnofficialData['items'] as $key => $value) {
    $kinopoiskIdList[] = $value['filmId'];
  }

  WatchAddSimilarsByData($kpid, $kinopoiskIdList);

  return $kinopoiskIdList;
}

function WatchGetSimilarsByKpid (int $kpid) {
  $isExits = WatchAddSimilarsDbIfExitsByKpid($kpid);

  $query_similars = "SELECT * FROM WatchSimilars WHERE kinopoiskId = :kinopoiskId";
  $var_similars = [
    ':kinopoiskId' => $kpid
  ];
  $similars = dbGetOne($query_similars, $var_similars);

  if (!$similars) return ['total' => 0];
  $kinopoiskIdList = $similars['kinopoiskIdList'];

  $query = "SELECT id, kinopoiskId, nameRu, ratingAgeLimits, ratingKinopoisk, posterUrl, type, year FROM WatchContent WHERE kinopoiskId IN ($kinopoiskIdList) and kinopoiskId != :kinopoiskId";
  $var = [
    ':kinopoiskId' => $kpid
  ];

  $content['items'] = dbGetAll($query, $var);
  $content['total'] = count($content['items']);

  return $content;
}
