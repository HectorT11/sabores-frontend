// Componente raiz y enrutado simple por hash (#/login, #/dashboard).
(function () {
  var S = window.Sabores, h = React.createElement;

  function currentRoute() { return location.hash === '#/dashboard' ? 'dashboard' : 'login'; }

  function App() {
    var route = React.useState(currentRoute());
    React.useEffect(function () {
      function onHash() { route[1](currentRoute()); }
      window.addEventListener('hashchange', onHash);
      return function () { window.removeEventListener('hashchange', onHash); };
    }, []);

    function go(r) { location.hash = '#/' + r; route[1](r); }
    function logout() { S.auth.clear(); go('login'); }

    if (route[0] === 'dashboard') {
      return h(S.ProtectedRoute, { onDenied: function () { go('login'); } },
        h(S.Dashboard, { onLogout: logout }));
    }
    if (S.auth.isValid()) { setTimeout(function () { go('dashboard'); }, 0); return null; }
    return h(S.LoginForm, { onLogin: function () { go('dashboard'); } });
  }

  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
