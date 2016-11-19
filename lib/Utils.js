const yelpApiResponseToFilteredBusinesses = (apiResponse) => {
  return apiResponse.businesses.filter(business => {
    if (!business.is_closed) return business;
  }).map(business => ({
    name: business.name,
    rating: business.rating,
    image_url: business.image_url,
    display_address: business.location.display_address,
    coordinates: business.location.coordinate
  }));
}

module.exports = {
  YelpBusinessFilter: yelpApiResponseToFilteredBusinesses
}
