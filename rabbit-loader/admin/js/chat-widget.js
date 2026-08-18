(function () {
  'use strict';

  var mount = document.getElementById('mfe_rl-chat');
  if (!mount) {
    return;
  }

  var wrapper = document.getElementById('rabbitloader-admin-wrap');
  var chatState = 'collapsed';

  var style = document.createElement('style');
  style.textContent = [
    '#mfe_rl-chat{position:fixed;left:calc(160px + 24px);right:24px;bottom:16px;z-index:100000;pointer-events:none}',
    'body.folded #mfe_rl-chat{left:calc(36px + 24px)}',
    '@media (max-width:960px){#mfe_rl-chat{left:16px;right:16px;bottom:12px}}',
    '#mfe_rl-chat *{box-sizing:border-box}',
    '#mfe_rl-chat .rl-chat-shell{pointer-events:auto;margin-left:auto;max-width:780px}',
    '#mfe_rl-chat .rl-chat-card{background:#fff;border:1px solid #e6ebf2;border-radius:18px;box-shadow:0 16px 38px rgba(34,49,69,.16);overflow:hidden}',
    '#mfe_rl-chat .rl-chat-collapsed{display:flex;align-items:center;gap:12px;width:100%;padding:14px 16px;border:0;background:#fff;color:#223145;cursor:pointer;text-align:left}',
    '#mfe_rl-chat .rl-chat-collapsed:hover,#mfe_rl-chat .rl-chat-collapsed:focus{background:#fbfdff}',
    '#mfe_rl-chat .rl-chat-icon{display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:12px;background:#eef5fb;color:#223145;flex-shrink:0;font-size:18px;font-weight:700}',
    '#mfe_rl-chat .rl-chat-prompt{flex:1;min-width:0}',
    '#mfe_rl-chat .rl-chat-prompt strong{display:block;font-size:14px;line-height:1.2}',
    '#mfe_rl-chat .rl-chat-prompt span{display:block;color:#7a8698;font-size:13px;line-height:1.3;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#mfe_rl-chat .rl-chat-open-pill{display:inline-flex;align-items:center;justify-content:center;min-width:108px;padding:10px 14px;border-radius:999px;background:#f3f7fb;color:#223145;font-size:13px;font-weight:600}',
    '#mfe_rl-chat .rl-chat-panel{display:none}',
    '#mfe_rl-chat.is-compact .rl-chat-panel,#mfe_rl-chat.is-extended .rl-chat-panel{display:block}',
    '#mfe_rl-chat.is-compact .rl-chat-collapsed,#mfe_rl-chat.is-extended .rl-chat-collapsed{display:none}',
    '#mfe_rl-chat .rl-chat-panel__header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border-bottom:1px solid #edf2f7}',
    '#mfe_rl-chat .rl-chat-panel__title{display:flex;align-items:center;gap:10px;color:#223145;font-weight:700}',
    '#mfe_rl-chat .rl-chat-panel__actions{display:flex;align-items:center;gap:8px}',
    '#mfe_rl-chat .rl-chat-toggle,#mfe_rl-chat .rl-chat-close{border:0;background:#f3f7fb;color:#223145;border-radius:999px;padding:8px 12px;font-size:12px;font-weight:600;cursor:pointer}',
    '#mfe_rl-chat .rl-chat-body{padding:0 16px 16px;background:#fff}',
    '#mfe_rl-chat .rl-chat-preview{padding:14px 0 10px;color:#4b5a70;font-size:13px;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
    '#mfe_rl-chat .rl-chat-frame-wrap{border:1px solid #edf2f7;border-radius:14px;overflow:hidden;background:#fbfdff}',
    '#mfe_rl-chat .rl-chat-frame{display:block;width:100%;border:0;height:178px;background:#fff}',
    '#mfe_rl-chat.is-extended .rl-chat-frame{height:320px}',
    '#mfe_rl-chat .rl-chat-composer{display:flex;align-items:center;gap:10px;padding:12px 14px;border-top:1px solid #edf2f7;background:#fff}',
    '#mfe_rl-chat .rl-chat-composer__input{flex:1;border:1px solid #d9e2ec;border-radius:999px;padding:11px 14px;color:#7a8698;font-size:13px;background:#f8fbff}',
    '#mfe_rl-chat .rl-chat-composer__send{border:0;border-radius:999px;background:#eef5fb;color:#223145;padding:10px 14px;font-size:13px;font-weight:600;cursor:pointer}',
    '@media (max-width:782px){#mfe_rl-chat .rl-chat-open-pill{min-width:auto}#mfe_rl-chat .rl-chat-frame{height:160px}#mfe_rl-chat.is-extended .rl-chat-frame{height:280px}}'
  ].join('');

  var shell = document.createElement('div');
  shell.className = 'rl-chat-shell';

  var card = document.createElement('div');
  card.className = 'rl-chat-card';

  var collapsedButton = document.createElement('button');
  collapsedButton.className = 'rl-chat-collapsed';
  collapsedButton.type = 'button';
  collapsedButton.innerHTML = [
    '<span class="rl-chat-icon" aria-hidden="true">RL</span>',
    '<span class="rl-chat-prompt"><strong>Ask RabbitLoader...</strong><span>Quick answers, setup help, and troubleshooting</span></span>',
    '<span class="rl-chat-open-pill">Open chat</span>'
  ].join('');

  var panel = document.createElement('div');
  panel.className = 'rl-chat-panel';
  panel.innerHTML = [
    '<div class="rl-chat-panel__header">',
    '<div class="rl-chat-panel__title"><span class="rl-chat-icon" aria-hidden="true">RL</span><span>RabbitLoader Assistant</span></div>',
    '<div class="rl-chat-panel__actions">',
    '<button type="button" class="rl-chat-toggle">Extend</button>',
    '<button type="button" class="rl-chat-close">Close</button>',
    '</div>',
    '</div>',
    '<div class="rl-chat-body">',
    '<div class="rl-chat-preview">RabbitLoader Assistant is ready to help with setup questions, optimization issues, and dashboard guidance.</div>',
    '<div class="rl-chat-frame-wrap"><iframe class="rl-chat-frame" src="https://chat.rabbitloader.com" title="RabbitLoader chat support" allow="clipboard-write"></iframe></div>',
    '<div class="rl-chat-composer">',
    '<div class="rl-chat-composer__input">Ask RabbitLoader...</div>',
    '<button type="button" class="rl-chat-composer__send">Open</button>',
    '</div>',
    '</div>'
  ].join('');

  card.appendChild(collapsedButton);
  card.appendChild(panel);
  shell.appendChild(card);
  mount.appendChild(style);
  mount.appendChild(shell);

  var toggleButton = panel.querySelector('.rl-chat-toggle');
  var closeButton = panel.querySelector('.rl-chat-close');
  var sendButton = panel.querySelector('.rl-chat-composer__send');

  function updateWrapperOffset() {
    if (!wrapper) {
      return;
    }
    wrapper.classList.remove('rl-chat-offset-collapsed', 'rl-chat-offset-compact', 'rl-chat-offset-extended');
    wrapper.classList.add(
      chatState === 'extended'
        ? 'rl-chat-offset-extended'
        : chatState === 'compact'
        ? 'rl-chat-offset-compact'
        : 'rl-chat-offset-collapsed'
    );
  }

  function setState(nextState) {
    chatState = nextState;
    mount.classList.remove('is-compact', 'is-extended');
    if (nextState === 'compact') {
      mount.classList.add('is-compact');
      toggleButton.textContent = 'Extend';
    } else if (nextState === 'extended') {
      mount.classList.add('is-extended');
      toggleButton.textContent = 'Compact';
    }
    updateWrapperOffset();
  }

  collapsedButton.addEventListener('click', function () {
    setState('compact');
  });

  toggleButton.addEventListener('click', function () {
    setState(chatState === 'extended' ? 'compact' : 'extended');
  });

  closeButton.addEventListener('click', function () {
    setState('collapsed');
  });

  sendButton.addEventListener('click', function () {
    setState(chatState === 'collapsed' ? 'compact' : chatState);
  });

  updateWrapperOffset();
})();
