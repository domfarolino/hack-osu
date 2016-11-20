const yelpApiResponseToFilteredBusinesses = (apiResponse) => {
  return apiResponse.businesses.filter(business => {
    if (!business.is_closed) return business;
  }).map(business => ({
    name: business.name,
    url: business.url,
    rating: business.rating,
    image_url: business.image_url,
    large_image_url: business.image_url.substring(0, business.image_url.length - 6) + 'l.jpg',
    display_address: business.location.display_address,
    coordinates: business.location.coordinate
  }));
}

module.exports = {
  YelpBusinessFilter: yelpApiResponseToFilteredBusinesses
}
