import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

//画面の大きさ
const containerStyle = {
  width: "400px",
  height: "400px",
};

//どこを中心としているのか
const center = {
  lat: 35.69575,
  lng: 139.77521,
};

//目的地1
const positionAkiba = {
  lat: 35.69731,
  lng: 139.7747,
};

//目的地2
const positionIwamotocho = {
  lat: 35.69397,
  lng: 139.7762,
};

//ラベルの変数
const markerLabelAkiba = {
  color: "white",
  fontFamily: "sans-serif",
  fontSize: "15px",
  fontWeight: "100",
  text: "5",
};

const markerLabelIwamotocho = {
  color: "white",
  fontFamily: "sans-serif",
  fontSize: "15px",
  fontWeight: "100",
  text: "12",
};

export default function Map() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyD2E29hstZdVjn_ltO40KbkU_xbtwgsjmw">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={positionAkiba} label={markerLabelAkiba} />
        <Marker position={positionIwamotocho} label={markerLabelIwamotocho} />
      </GoogleMap>
    </LoadScript>
  );
}
