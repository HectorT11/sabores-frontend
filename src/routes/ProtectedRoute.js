// Ruta protegida: solo muestra el contenido si hay un token JWT vigente.
(function () {
  var S = window.Sabores;
  S.ProtectedRoute = function (props) {
    React.useEffect(function () {
      if (!S.auth.isValid()) { props.onDenied(); }
    });
    return S.auth.isValid() ? props.children : null;
  };
})();
