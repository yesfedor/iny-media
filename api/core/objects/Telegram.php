<?php
// https://api.telegram.org/bot5567228138:AAFYDnXdhRbPWvWL-bcHAryE2iRxKQ_QJ2g/
function TelegramWebhook () {
  $log = false;
  $message = $_POST['message'];
  $from = $message['from'];
  $username = $from['username'];
  $chat = $message['chat'];
  $chatId = $chat['id'];
  $text = $message['text'];

  if (!$chatId) {
    return ['bad'];
  }

  switch ($text) {
    case '/start':
      TelegramSendMessage($chatId, 'Отправь мне код со своего профиля на https://iny.su/telegram-code, чтобы я мог присылать новые серии');
      break;
    case substr($text, 0, 5) === '/code':
      $textArray = explode(' ', $text);
      $code = $textArray[1];
      if ($code) {
        TelegramSendMessage($chatId, crypt($code, 'telegram-code-id'));
      }
      break;
    case '/stop':
      break;
  }

  if ($log) {
    $fileLog = DIR . '/core/telegram.log';
    $message = '---Start
$chatId: '. $chatId .'
$text: '. $text .'
$from: '.json_encode($from).'
End--';
    file_put_contents($fileLog, $message);
  }
  return ['ok'];
}

function TelegramSendMessage($chatId, $messaggio) {
  $TelegramTokenBot = '5567228138:AAFYDnXdhRbPWvWL-bcHAryE2iRxKQ_QJ2g';
  $url = "https://api.telegram.org/bot" . $TelegramTokenBot . "/sendMessage?chat_id=" . $chatId;
  $url = $url . "&text=" . urlencode($messaggio);
  $ch = curl_init();
  $optArray = array(
          CURLOPT_URL => $url,
          CURLOPT_RETURNTRANSFER => true
  );
  curl_setopt_array($ch, $optArray);
  $result = curl_exec($ch);
  curl_close($ch);

  return $result;
}

function TelegramGetCrypt($uid) {
  return crypt($uid, '-telegram-code-id');
}
