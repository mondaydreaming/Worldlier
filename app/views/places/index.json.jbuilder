json.array!(@places) do |place|
  json.extract! place, :id, :name, :description, :google_id, :latitude, :longitude, :photo_url
  json.url place_url(place, format: :json)
end
