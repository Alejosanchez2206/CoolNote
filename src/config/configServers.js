
export var gsUrlApi = "";
var sAmbiente = "DEV";

switch (sAmbiente) {
    case "PRODUCCION":
        gsUrlApi = '';
        break;
    default:
        gsUrlApi = "http://localhost:8080";
        break;
}
 