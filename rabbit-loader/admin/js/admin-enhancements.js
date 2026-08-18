(function () {
  'use strict';

  var boot = window.rabbitloader_local_vars || {};
  var root = document.getElementById('rabbitloader-root');
  if (!root || !boot.admin_ajax || !boot.rl_nonce) {
    return;
  }

  var metricsConfig = [
    { key: 'lcp', title: 'LCP', unit: 'auto' },
    { key: 'tbt', title: 'TBT', unit: 'ms' },
    { key: 'speed_index', title: 'Speed Index', unit: 'auto' }
  ];

  var mountId = 'rl-impact-panel';
  var lastPlacementKey = '';

  function createActionUrl(action) {
    var url = new URL(boot.admin_ajax, window.location.href);
    url.searchParams.set('action', action);
    url.searchParams.set('rl_nonce', boot.rl_nonce);
    return url.toString();
  }

  function fetchImpact() {
    var action = boot.impact_actions && boot.impact_actions.fetch ? boot.impact_actions.fetch : 'rabbitloader_impact_data';
    return fetch(createActionUrl(action), {
      method: 'GET',
      credentials: 'same-origin'
    }).then(function (response) {
      return response.json();
    });
  }

  function refreshImpact() {
    var action = boot.impact_actions && boot.impact_actions.refresh ? boot.impact_actions.refresh : 'rabbitloader_impact_refresh';
    return fetch(boot.admin_ajax, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
        action: action,
        rl_nonce: boot.rl_nonce
      }).toString()
    }).then(function (response) {
      return response.json();
    });
  }

  function formatTimestamp(value) {
    if (!value) {
      return 'Never';
    }

    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      var numeric = parseInt(value, 10);
      if (!Number.isNaN(numeric)) {
        date = new Date(numeric * 1000);
      }
    }

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatMetricValue(value, unitMode) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return '&mdash;';
    }

    var numeric = Number(value);
    if (unitMode === 'ms') {
      return Math.round(numeric) + 'ms';
    }

    if (numeric >= 1000) {
      return (numeric / 1000).toFixed(numeric >= 10000 ? 0 : 1) + 's';
    }

    return Math.round(numeric) + 'ms';
  }

  function getDifferenceLabel(before, after, unitMode) {
    if (before === null || after === null) {
      return '';
    }

    var diff = Math.abs(before - after);
    var direction = after < before ? 'reduced' : after > before ? 'increased' : 'unchanged';
    if (direction === 'unchanged') {
      return 'No change';
    }

    return formatMetricValue(diff, unitMode) + ' ' + direction;
  }

  function getMetricState(before, after) {
    if (before === null || after === null) {
      return 'empty';
    }
    if (after < before) {
      return 'improved';
    }
    if (after > before) {
      return 'regressed';
    }
    return 'neutral';
  }

  function computeBarWidth(value, maxValue) {
    if (value === null || maxValue <= 0) {
      return '14%';
    }
    return Math.max(14, Math.round((value / maxValue) * 100)) + '%';
  }

  function getImpactContainer() {
    var main = root.firstElementChild;
    if (!main) {
      return null;
    }

    var directChildren = Array.prototype.filter.call(main.children || [], function (child) {
      return child.nodeType === 1;
    });

    if (!directChildren.length) {
      return main;
    }

    for (var i = 0; i < directChildren.length; i += 1) {
      var child = directChildren[i];
      if (child.querySelector && child.querySelector('a[href*="dash.rabbitloader.com"]')) {
        return main;
      }
    }

    return main;
  }

  function ensureMount() {
    var container = getImpactContainer();
    if (!container) {
      return null;
    }

    var existing = document.getElementById(mountId);
    var children = Array.prototype.filter.call(container.children || [], function (child) {
      return child.nodeType === 1 && child.id !== mountId;
    });
    var anchor = children.length > 2 ? children[2] : null;
    var placementKey = String(children.length) + ':' + (anchor ? anchor.tagName : 'end');

    if (!existing) {
      existing = document.createElement('section');
      existing.id = mountId;
      existing.className = 'rl-impact-panel';
    }

    if (lastPlacementKey !== placementKey || existing.parentNode !== container) {
      if (anchor) {
        container.insertBefore(existing, anchor);
      } else {
        container.appendChild(existing);
      }
      lastPlacementKey = placementKey;
    }

    return existing;
  }

  function renderSkeleton() {
    renderPanel({
      result: true,
      data: {
        last_checked: '',
        metrics: {}
      }
    }, true);
  }

  function renderPanel(payload, isLoading, message) {
    var mount = ensureMount();
    if (!mount) {
      return;
    }

    var metrics = payload && payload.data && payload.data.metrics ? payload.data.metrics : {};
    var values = [];
    metricsConfig.forEach(function (metric) {
      var entry = metrics[metric.key] || {};
      if (entry.before !== null && entry.before !== undefined) {
        values.push(Number(entry.before));
      }
      if (entry.after !== null && entry.after !== undefined) {
        values.push(Number(entry.after));
      }
    });

    var maxValue = values.length ? Math.max.apply(Math, values) : 0;

    var cardsHtml = metricsConfig.map(function (metric) {
      var entry = metrics[metric.key] || { before: null, after: null };
      var state = getMetricState(entry.before, entry.after);
      var hasValueRow = entry.before !== null && entry.before !== undefined || entry.after !== null && entry.after !== undefined;
      var beforeText = formatMetricValue(entry.before, metric.unit);
      var afterText = formatMetricValue(entry.after, metric.unit);
      var diffText = getDifferenceLabel(entry.before, entry.after, metric.unit);

      return [
        '<article class="rl-impact-card rl-impact-card--', state, '">',
        '<div class="rl-impact-card__title">', metric.title, '</div>',
        hasValueRow ? '<div class="rl-impact-card__values"><span class="rl-impact-card__before">' + beforeText + '</span><span class="rl-impact-card__arrow" aria-hidden="true">&rarr;</span><span class="rl-impact-card__after">' + afterText + '</span></div>' : '',
        '<div class="rl-impact-card__delta">', diffText || '&nbsp;', '</div>',
        '<div class="rl-impact-bar-row">',
        '<span class="rl-impact-bar-row__label">With RabbitLoader</span>',
        '<div class="rl-impact-bar"><span class="rl-impact-bar__fill rl-impact-bar__fill--after" style="width:', computeBarWidth(entry.after, maxValue), '"></span></div>',
        '<span class="rl-impact-bar-row__value">', afterText, '</span>',
        '</div>',
        '<div class="rl-impact-bar-row">',
        '<span class="rl-impact-bar-row__label">Without RabbitLoader</span>',
        '<div class="rl-impact-bar"><span class="rl-impact-bar__fill rl-impact-bar__fill--before" style="width:', computeBarWidth(entry.before, maxValue), '"></span></div>',
        '<span class="rl-impact-bar-row__value">', beforeText, '</span>',
        '</div>',
        '</article>'
      ].join('');
    }).join('');

    mount.innerHTML = [
      '<div class="rl-impact-panel__card">',
      '<div class="rl-impact-panel__header">',
      '<div>',
      '<h2 class="rl-impact-panel__title">RabbitLoader Impact</h2>',
      '<p class="rl-impact-panel__subtitle">Without RabbitLoader &rarr; With RabbitLoader</p>',
      '</div>',
      '<div class="rl-impact-panel__actions">',
      '<div class="rl-impact-panel__meta">Last checked <strong>', formatTimestamp(payload && payload.data ? payload.data.last_checked : ''), '</strong></div>',
      '<button type="button" class="rl-impact-panel__refresh" ', isLoading ? 'disabled' : '', '>Refresh impact</button>',
      '</div>',
      '</div>',
      message ? '<p class="rl-impact-panel__message">' + escapeHtml(message) + '</p>' : '',
      '<div class="rl-impact-panel__grid">', cardsHtml, '</div>',
      '</div>'
    ].join('');

    var button = mount.querySelector('.rl-impact-panel__refresh');
    if (button) {
      button.addEventListener('click', function () {
        button.disabled = true;
        renderPanel(payload || { result: true, data: { last_checked: '', metrics: {} } }, true, 'Refreshing impact...');
        refreshImpact()
          .then(function (response) {
            if (!response || !response.result) {
              renderPanel(payload || { result: true, data: { last_checked: '', metrics: {} } }, false, response && response.message ? response.message : 'Unable to refresh impact right now.');
              return;
            }
            renderPanel(response, false, response.message || '');
          })
          .catch(function () {
            renderPanel(payload || { result: true, data: { last_checked: '', metrics: {} } }, false, 'Unable to refresh impact right now.');
          });
      });
    }
  }

  function loadImpact() {
    renderSkeleton();
    fetchImpact()
      .then(function (response) {
        if (!response || !response.result) {
          renderPanel({
            result: true,
            data: {
              last_checked: '',
              metrics: {}
            }
          }, false, response && response.message ? response.message : '');
          return;
        }
        renderPanel(response, false, '');
      })
      .catch(function () {
        renderPanel({
          result: true,
          data: {
            last_checked: '',
            metrics: {}
          }
        }, false, '');
      });
  }

  var observer = new MutationObserver(function () {
    ensureMount();
  });

  observer.observe(root, {
    childList: true,
    subtree: true
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadImpact, { once: true });
  } else {
    loadImpact();
  }
})();
