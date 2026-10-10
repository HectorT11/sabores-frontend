// Servicio de API y manejo del token JWT (separado de la interfaz).
(function () {
  var S = (window.Sabores = window.Sabores || {});
  var KEY = 'sabores_token';

  function payload(token) {
    try {
      var b = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(b));
    } catch (e) { return null; }
  }

  S.auth = {
    getToken: function () { try { return sessionStorage.getItem(KEY); } catch (e) { return null; } },
    setToken: function (t) { try { sessionStorage.setItem(KEY, t); } catch (e) {} },
    clear: function () { try { sessionStorage.removeItem(KEY); } catch (e) {} },
    isValid: function () {
      var t = S.auth.getToken();
      if (!t) return false;
      var p = payload(t);
      return !!p && (!p.exp || p.exp * 1000 > Date.now());
    }
  };

  async function request(path, options) {
    var res = await fetch(path, options);
    var data = null;
    try { data = await res.json(); } catch (e) {}
    if (!res.ok) {
      var err = new Error((data && data.mensaje) || ('Error ' + res.status));
      err.status = res.status;
      throw err;
    }
    return data;
  }

  S.api = {
    login: function (codigoEmp, password) {
      return request('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigoEmp: codigoEmp, password: password })
      });
    },
    dashboard: function () {
      return request('/api/dashboard', {
        headers: { Authorization: 'Bearer ' + S.auth.getToken() }
      });
    }
  };
})();
