// Pantalla de inicio de sesion.
(function () {
  var S = window.Sabores, h = React.createElement;

  S.LoginForm = function (props) {
    var u = React.useState(''), p = React.useState('');
    var err = React.useState(''), busy = React.useState(false);

    async function submit(e) {
      e.preventDefault();
      err[1](''); busy[1](true);
      try {
        var data = await S.api.login(u[0], p[0]);
        S.auth.setToken(data.token);
        props.onLogin();
      } catch (ex) {
        err[1](ex.status === 401 ? 'Usuario o contraseña incorrectos.' : (ex.message || 'No se pudo iniciar sesión.'));
      } finally { busy[1](false); }
    }

    return h('div', { className: 'center' },
      h(S.Card, { className: 'login' },
        h('h1', null, 'Sabores'),
        h('p', { className: 'muted' }, 'Inicia sesión para ver el panel'),
        err[0] ? h('div', { className: 'error' }, err[0]) : null,
        h('form', { onSubmit: submit },
          h(S.Input, { label: 'Código de empleado', value: u[0], onChange: u[1], autoComplete: 'username' }),
          h(S.Input, { label: 'Contraseña', type: 'password', value: p[0], onChange: p[1], autoComplete: 'current-password' }),
          h(S.Button, { type: 'submit', variant: 'full', disabled: busy[0] }, busy[0] ? 'Entrando…' : 'Entrar'))));
  };
})();
