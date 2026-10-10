// Componentes reutilizables de interfaz.
(function () {
  var S = window.Sabores, h = React.createElement;

  S.Card = function (props) {
    return h('div', { className: 'card ' + (props.className || '') }, props.children);
  };

  S.Button = function (props) {
    return h('button', {
      type: props.type || 'button',
      className: 'btn ' + (props.variant || ''),
      disabled: props.disabled,
      onClick: props.onClick
    }, props.children);
  };

  S.Input = function (props) {
    return h('label', { className: 'field' }, props.label,
      h('input', {
        type: props.type || 'text',
        value: props.value,
        autoComplete: props.autoComplete,
        required: true,
        onChange: function (e) { props.onChange(e.target.value); }
      }));
  };

  S.StatCard = function (props) {
    return h(S.Card, { className: 'stat' },
      h('div', { className: 'n' }, props.value),
      h('div', { className: 'l' }, props.label));
  };
})();
