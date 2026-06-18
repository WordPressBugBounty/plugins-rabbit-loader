(function () {
  'use strict';

  var mount = document.getElementById('mfe_rl-chat');
  if (!mount) {
    return;
  }

  var style = document.createElement('style');
  style.textContent =
    '#mfe_rl-chat{position:fixed;right:20px;bottom:20px;z-index:100000}' +
    '#mfe_rl-chat-button{display:flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:12px 18px;background:#087dcc;color:#fff;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.2)}' +
    '#mfe_rl-chat-button:hover,#mfe_rl-chat-button:focus{background:#066baF;color:#fff}' +
    '#mfe_rl-chat-panel{display:none;position:absolute;right:0;bottom:58px;width:min(380px,calc(100vw - 40px));height:min(600px,calc(100vh - 120px));border:0;border-radius:12px;background:#fff;box-shadow:0 8px 30px rgba(0,0,0,.25)}' +
    '#mfe_rl-chat.is-open #mfe_rl-chat-panel{display:block}';

  var panel = document.createElement('iframe');
  panel.id = 'mfe_rl-chat-panel';
  panel.src = 'https://chat.rabbitloader.com';
  panel.title = 'RabbitLoader chat support';
  panel.setAttribute('allow', 'clipboard-write');

  var button = document.createElement('button');
  button.id = 'mfe_rl-chat-button';
  button.type = 'button';
  button.textContent = 'Chat with us';
  button.setAttribute('aria-controls', panel.id);
  button.setAttribute('aria-expanded', 'false');

  button.addEventListener('click', function () {
    var isOpen = mount.classList.toggle('is-open');
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    button.textContent = isOpen ? 'Close chat' : 'Chat with us';
  });

  mount.appendChild(style);
  mount.appendChild(panel);
  mount.appendChild(button);
})();
