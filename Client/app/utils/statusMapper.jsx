const MapStatus = (NumberInString) => {
    switch(NumberInString){
        case "0":
            return "Going";

        case "1":
            return "Not Going";
        case "2":
            return "Maybe";
        default:
            return "Unknown";
    }
}

export default MapStatus;