var markers = [];
var infowWindows = [];
var customOverlays = [];

function updateMap(){
    clear();

    // 카테고리로 중개업소를 검색합니다
    ps.categorySearch('AG2', placesSearchCB, {
        //location: map.getCenter(),
        useMapBounds: true,
        page: 45
    });

    resizeWindow();
}

function getCurLocation() {
    if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude; // 위도
            var lon = position.coords.longitude; // 경도
            var pos = new daum.maps.LatLng(lat, lon);
            map.setCenter(pos);
        });
    }
}

var curPage = 0;

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (result, status, pagination) {
    if (status == daum.maps.services.Status.OK) {
        if (curPage == 0) {
            curPage++;
            pagination.gotoFirst();
            return;
        }

        if (curPage > pagination.last) {
            curPage = 0;
            return;
        }

        for (var i = 0; i < result.length; i++) {
            displayMarker(result[i]);
        }

        curPage++;
        pagination.gotoPage(curPage);
    }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new daum.maps.Marker({
        map: map,
        position: new daum.maps.LatLng(place.y, place.x),
    });

    var infoWindow = new daum.maps.InfoWindow({
        position : marker.getPosition(),
        content : '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>',
    });

    markers.push(marker);
    infowWindows.push(infoWindow);

    marker.setMap(map);

    daum.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infoWindow));
    daum.maps.event.addListener(marker, 'mouseout', makeOutListener(infoWindow));
    daum.maps.event.addListener(marker, 'click', clickListener(map, marker, place, infoWindow));
}

function getOverlayContent(place) {
    // 커스텀 오버레이에 표시할 컨텐츠 입니다
    // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
    // 별도의 이벤트 메소드를 제공하지 않습니다 
    var content =
        '<div class="Overlay">' + 
        '   <div class="Info">' + 
        '       <div class="Title">' + 
                    place.place_name + 
        '           <div class="Close" onclick="closeOverlay()" title="닫기"></div>' + 
        '       </div>' + 
        '       <div class="Body">' + 
        '           <div class="Desc">' + 
        '               <div class="Road_address_name">' + 
                            place.road_address_name + 
        '               </div>' + 
        '               <div class="Address_name">(지번) ' + 
                            place.address_name + 
        '               </div>' + 
        '               <div class="Phone">(전화) ' + 
                            place.phone + 
        '               </div>' + 
        '           </div>' + 
        '       </div>' + 
        '   </div>' +    
        '</div>';

    return content;
}

function displayCustomOverlay(map, marker, place) {
    closeOverlay();

    var customOverlay = new daum.maps.CustomOverlay({
        content: getOverlayContent(place),
        map: map,
        position: marker.getPosition(),
        zIndex: 3,
    });

    customOverlay.setMap(map);

    customOverlays.push(customOverlay);
}

function makeOverListener(map, marker, infoWindow) {
    return function() {
        infoWindow.open(map, marker);
    };
}

function makeOutListener(infoWindow) {
    return function() {
        infoWindow.close();
    };
}

function clickListener(map, marker, place, infoWindow) {
    return function() {
        displayCustomOverlay(map, marker, place);
        infoWindow.close();
    };
}

function closeOverlay() {
    customOverlays.forEach(function (item) {
        item.setMap(null);
    });
    customOverlays = [];
}

function clear() {
    markers = [];
    infowWindows = [];
}

function resizeWindow() {
    mapContainer.style.width = $(window).innerWidth() + 'px';
    mapContainer.style.height = $(window).innerHeight() + 'px';
    map.relayout();
}

var isRoadViewActivated = false;
function toggleRoadView() { 
    var control = document.getElementById('roadView');
    if (isRoadViewActivated) {
        map.removeOverlayMapTypeId(daum.maps.MapTypeId.ROADVIEW);
    } else {
        map.addOverlayMapTypeId(daum.maps.MapTypeId.ROADVIEW)
    }
    isRoadViewActivated = !isRoadViewActivated;
}

var isDistrictActivated = false;
function toggleDistrict() { 
    var control = document.getElementById('district_btn_selected');
    if (isDistrictActivated) {
        map.removeOverlayMapTypeId(daum.maps.MapTypeId.USE_DISTRICT);
        control.className = 'district_btn';
    } else {
        map.addOverlayMapTypeId(daum.maps.MapTypeId.USE_DISTRICT)
        control.className = 'district_btn_selected';
    }
    isDistrictActivated = !isDistrictActivated;
}

var isTerrainActivated = false;
function toggleTerrain() { 
    var control = document.getElementById('terrain_btn');
    if (isTerrainActivated) {
        map.removeOverlayMapTypeId(daum.maps.MapTypeId.TERRAIN);
        control.className = 'terrain_btn';
    } else {
        map.addOverlayMapTypeId(daum.maps.MapTypeId.TERRAIN)
        control.className = 'terrain_btn_selected';
    }
    isTerrainActivated = !isTerrainActivated;
}

var isBicycleActivated = false;
function toggleBicycle() { 
    var control = document.getElementById('bicycle_btn');
    if (isBicycleActivated) {
        map.removeOverlayMapTypeId(daum.maps.MapTypeId.BICYCLE);
        control.className = 'bicycle_btn';
    } else {
        map.addOverlayMapTypeId(daum.maps.MapTypeId.BICYCLE)
        control.className = 'bicycle_btn_selected';
    }
    isBicycleActivated = !isBicycleActivated;
}

function enterkey() {
    // 엔터:13
    if (window.event.keyCode == 13) {
        //searchPlaces();
        resizeWindow();
    }
}
