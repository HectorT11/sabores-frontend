// Dashboard protegido: consume /api/dashboard con el token JWT.
(function () {
  var S = window.Sabores, h = React.createElement;

  function PedidosTable(props) {
    var cols = ['Pedido', 'Cliente', 'Platillo', 'Cant.', 'Total', 'Mesa', 'Fecha'];
    return h('div', { className: 'scroll' },
      h('table', null,
        h('thead', null, h('tr', null, cols.map(function (c) { return h('th', { key: c }, c); }))),
        h('tbody', null, props.rows.map(function (r) {
          return h('tr', { key: r.pedidoId },
            h('td', null, r.pedidoId),
            h('td', null, r.nombreCliente),
            h('td', null, r.platillo),
            h('td', null, r.cantidad),
            h('td', null, '$' + r.total),
            h('td', null, r.mesa),
            h('td', null, String(r.fechaReg || '').replace('T', ' ').slice(0, 16)));
        }))));
  }

  S.Dashboard = function (props) {
    var data = React.useState(null), err = React.useState('');

    React.useEffect(function () {
      S.api.dashboard().then(data[1]).catch(function (ex) {
        if (ex.status === 401 || ex.status === 403) { props.onLogout(); }
        else { err[1](ex.message || 'No se pudo cargar el panel.'); }
      });
    }, []);

    var d = data[0];
    return h('div', null,
      h('div', { className: 'top' },
        h('strong', null, 'Sabores · Panel'),
        h('span', null, d ? (d.usuario + ' (' + d.rol + ')  ') : '',
          h(S.Button, { variant: 'ghost', onClick: props.onLogout }, 'Cerrar sesión'))),
      h('div', { className: 'wrap' },
        err[0] ? h('div', { className: 'error' }, err[0]) : null,
        !d && !err[0] ? h('p', { className: 'muted' }, 'Cargando…') : null,
        d ? h('div', null,
          h('div', { className: 'stats' },
            h(S.StatCard, { label: 'Clientes activos', value: d.clientesActivos }),
            h(S.StatCard, { label: 'Pedidos', value: d.totalPedidos }),
            h(S.StatCard, { label: 'Ventas totales', value: '$' + d.ventasTotales })),
          h(S.Card, null,
            h('h1', null, 'Últimos pedidos'),
            h(PedidosTable, { rows: d.ultimosPedidos || [] }))) : null));
  };
})();
