import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('../images/user.png').default,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(27, 28)
});

export { iconPerson };