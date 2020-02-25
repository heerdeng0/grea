document.getElementById('roadview_btn').setAttribute('onclick', 'toggleRoadView()');
document.getElementById('district_btn').setAttribute('onclick', 'toggleDistrict()');
document.getElementById('district_btn_selected').setAttribute('onclick', 'toggleDistrict()');
document.getElementById('terrain_btn').setAttribute('onclick', 'toggleTerrain()');
document.getElementById('terrain_btn_selected').setAttribute('onclick', 'toggleTerrain()');
document.getElementById('bicycle_btn').setAttribute('onclick', 'toggleBicycle()');
document.getElementById('bicycle_btn_selected').setAttribute('onclick', 'toggleBicycle()');

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new daum.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new daum.maps.Map(mapContainer, mapOption);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new daum.maps.ZoomControl();
map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new daum.maps.MapTypeControl();
map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

// 장소 검색 객체를 생성합니다
var ps = new daum.maps.services.Places(map);

getCurLocation();

updateMap();

daum.maps.event.addListener(map, 'dragend', function() {
    updateMap();
});

daum.maps.event.addListener(map, 'zoom_changed', function() {
    updateMap();
});

window.onresize = function() {
    resizeWindow();
};