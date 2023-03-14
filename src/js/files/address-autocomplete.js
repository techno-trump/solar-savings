export function initGooglePlaces() {
	const displaySuggestions = function(predictions, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
      return;
    }
		console.log(predictions);
    predictions.forEach((prediction) => { });
  };

  const service = new google.maps.places.AutocompleteService();

  service.getQueryPredictions({ input: "flo" }, displaySuggestions);
}