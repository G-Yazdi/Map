import L from 'leaflet';

const iconVisitor = new L.Icon({
    iconUrl: require('../images/Visitors.png').default,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(38, 38),
});

const iconMarket = new L.Icon({
    iconUrl: require('../images/Market.png').default,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(38, 38)
});


const iconFlag = new L.Icon({
    iconUrl: require('../images/flag.png').default,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(38, 38),
    className:"myIcon"
});

export { iconVisitor, iconMarket, iconFlag };